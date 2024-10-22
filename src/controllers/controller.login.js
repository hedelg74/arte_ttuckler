import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import createConnection from "../../dbconnection/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const controllerLogIn = {
	logIn: async (req, res) => {
		const connection = await createConnection();
		try {
			const { email, password } = req.body;
			const query = "SELECT * FROM users WHERE email = ?";
			const [user] = await connection.query(query, [email]);

			// Verificar que el usuario fue encontrado
			if (user.length === 0) {
				return res.status(401).json({ message: "Email o contrasena no validos." });
			}

			// Comparar la contraseña ingresada con el hash almacenado
			if (await bcrypt.compare(password, user[0].password_hash)) {
				// Contraseña correcta, puedes generar un token de sesión
				const token = generateToken(user[0].id, user[0].username); // Generar un token para la sesión

				res.cookie("token", token, {
					httpOnly: true, // No accesible desde JavaScript del lado del cliente
					secure: false, //true, // Solo se envía a través de HTTPS
					sameSite: "Strict", // Restringe el envío de cookies en solicitudes cruzadas
					maxAge: 3600000, // Establece la duración de la cookie (1 hora en milisegundos)
				});

				const redirectTo = req.session.returnTo || "/";
				delete req.session.returnTo;
				console.log(redirectTo);
				console.log("Inicio de sesión exitoso, redirigiendo...");
				return res.status(200).json({ redirect: redirectTo, username: user[0].username });
			} else {
				console.error("Creenciales no validas");
				return res.status(401).json({ message: "Email o contrasena no validos." });
			}
		} catch (e) {
			console.error("Error al iniciar sesión: ", e.message);
			res.status(500).json({ message: "Error en el servidor." }); // Cambia el mensaje para no revelar detalles
		} finally {
			await connection.end();
		}
	},
	renderLoginPage: (req, res) => {
		res.sendFile(path.join(__dirname, "../../public/login.html"));
	},
};

function generateToken(userId, userName) {
	const token = jwt.sign({ id: userId, username: userName }, process.env.JWT_SECRET_KEY, {
		expiresIn: "1h",
	});
	return token;
}

export default controllerLogIn;
