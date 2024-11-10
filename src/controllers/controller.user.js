import bcrypt from "bcrypt";
import createConnection from "../../dbconnection/connection.js";

const controllerUser = {
	loadPersonalData: async (req, res, next) => {
		const connection = await createConnection();
		const userId = req.session.userId;

		if (!userId) {
			return res.status(401).send("No autorizado");
		}

		try {
			const query = "SELECT * FROM users WHERE id=?";

			const [data] = await connection.query(query, userId);
			if (data.length > 0) {
				res.status(200).json(...data);
			} else {
				res.status(404).json({ success: false, message: "No hay usuarios para mostrar" });
			}
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},

	updatePersonalData: async (req, res, next) => {
		const { name, "last-name": lastName, "phone-number": phone } = req.body;

		const connection = await createConnection();
		const date = new Date(Date.now());
		const userId = req.session.userId;

		if (!userId) {
			return res.status(401).send("No autorizado");
		}

		const query = "UPDATE users SET name=?, last_name=?, phone=?, updated_at=? WHERE id=?";
		const datos = [name, lastName, phone, date, userId];
		try {
			await connection.query(query, datos);
			res.status(200).json({ success: true, message: "Tus datos han sido actualizados." });
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},
	updatePassword: async (req, res, next) => {
		const { password } = req.body;
		const connection = await createConnection();
		const date = new Date(Date.now());
		const userId = req.session.userId;

		if (!userId) {
			return res.status(401).send("No autorizado");
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const query = "UPDATE users SET password_hash=?, updated_at=? WHERE id=?";
		const datos = [passwordHash, date, userId];

		try {
			await connection.query(query, datos);
			res.status(200).json({ success: true, message: "Contrasena actualizada." });
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},
};

export default controllerUser;
