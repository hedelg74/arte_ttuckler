
import createConnection from "../../dbconnection/connection.js";

const controllerMantCategory = {
	loadSubCategory: async (req, res, next) => {
		const connection = await createConnection();
		//const userId = req.session.userId;

		try {
			const query = "SELECT * FROM sub_category";

			const [data] = await connection.query(query);
			if (data.length > 0) {
				res.status(200).json({success:true, data});
			} else {
				res.status(404).json({ success: false, message: "No hay Subcategorias para mostrar" });
			}
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},
	loadSubCategoryById: async (req, res, next) => {
		const connection = await createConnection();
		const subCategoryId = req.body.id;

		
		try {
			const query = "SELECT * FROM sub_category WHERE id=?";

			const [data] = await connection.query(query,[subCategoryId]);
			if (data.length > 0) {
				res.status(200).json({ success: true, data });
			} else {
				res.status(404).json({ success: false, message: "No hay categorias para mostrar" });
			}
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},

	addSubCategory: async (req, res, next) => {
		const { type, CategoryLine1, CategoryLine2, city, state, postalCode, country, isDefault } = req.body;
		const connection = await createConnection();
		const date = new Date(Date.now());
		const userId = req.session.userId;

		if (!userId) {
			return res.status(401).send("No autorizado");
		}

		try {
			if (!(await validateCategory(undefined, userId, type))) {
				const query = "INSERT INTO Category (user_id, type, Category_line1, Category_line2, city, state, postal_code, country, is_default, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)";
				const datos = [userId, type, CategoryLine1, CategoryLine2, city, state, postalCode, country, isDefault, date];
				await connection.query(query, datos);
				res.status(200).json({ success: true, message: "Direccion de envio agegada." });
			} else {
				res.status(409).json({ success: false, message: "Direccion ya existe." });
			}
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},

	updateSubCategory: async (req, res, next) => {
		const { type, CategoryLine1, CategoryLine2, city, state, postalCode, country, isDefault, CategoryId } = req.body;
		const connection = await createConnection();
		const userId = req.session.userId;

		if (!userId) {
			return res.status(401).send("No autorizado");
		}

		try {
			if (!(await validateCategory(CategoryId, userId, type))) {
				if (isDefault) {
					await connection.query("UPDATE Category SET is_default=NULL WHERE user_id=?", [userId]);
				}
				console.log("actualizadno");
				const query = "UPDATE Category SET type=?, Category_line1=?, Category_line2=?, city=?, state=?, postal_code=?, country=?, is_default=? WHERE id=? AND user_id=?";
				const datos = [type, CategoryLine1, CategoryLine2, city, state, postalCode, country, isDefault, Number(CategoryId), userId];

				await connection.query(query, datos);
				res.status(200).json({ success: true, message: "Direccion de envio actualizada." });
			} else {
				res.status(409).json({ success: false, message: "Direccion ya existe." });
			}
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},
};

async function validateCategory(CategoryId, userId, type) {
	const connection = await createConnection();
	const query = "SELECT * FROM Category WHERE user_id=? AND type=?";
	try {
		const [Category] = await connection.query(query, [userId, type]);

		if (Category.length > 0) {
			if (CategoryId !== undefined) {
				if (CategoryId != Category[0].id) {
					return true; //Ya existe otra direccion del mismo tipo
				} else return false;
			} else return true;
		} else return false;
	} catch (error) {
		throw new Error(error.message || "Error al validar la dirección");
	} finally {
		await connection.end();
	}
}

export default controllerMantCategory;
