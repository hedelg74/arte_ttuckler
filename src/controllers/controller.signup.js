import bcrypt from "bcrypt";
import createConnection from "../../dbconnection/connection.js";

const controllerSignUp = {
	registerUserAccount: async (req, res) => {
		const connection = await createConnection();
		if (!connection) {
			return res
				.status(500)
				.json({ success: false, message: "Error al conectar a la base de datos." });
		}
		try {
			const { username, email, password } = req.body;
			const passwordHash = await bcrypt.hash(password, 10);
			const query = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";

			await connection.query(query, [username, email, passwordHash]);

			console.log("Cuenta creada exitosamente.");
			res
				.status(200)
				.json({ success: true, message: "Cuenta ha sigo creado con exito.", data: req.body });
		} catch (e) {
			console.error("Error al crear la cuenta: ", e.message);
			res.status(500).json({ success: false, message: e.message });
		} finally {
			await connection.end();
		}
	},
};

export default controllerSignUp;
