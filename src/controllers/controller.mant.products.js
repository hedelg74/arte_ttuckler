import createConnection from "../../dbconnection/connection.js";
//	id	user_id	type	Product_line1	Product_line2	city	state	postal_code	country	is_default	created_at

const controllerMantProducts = {
	loadProduct: async (req, res, next) => {
		const connection = await createConnection();
		//const userId = req.session.userId;

		try {
			const query = "SELECT * FROM product";

			const [data] = await connection.query(query);
			if (data.length > 0) {
				res.render("./partials/list.products.ejs", { data });
			} else {
				res.status(404).json({ success: false, message: "No hay productos para mostrar" });
			}
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},

	addProduct: async (req, res, next) => {
		const { type, ProductLine1, ProductLine2, city, state, postalCode, country, isDefault } = req.body;
		const connection = await createConnection();
		const date = new Date(Date.now());
		const userId = req.session.userId;

		if (!userId) {
			return res.status(401).send("No autorizado");
		}

		try {
			if (!(await validateProduct(undefined, userId, type))) {
				const query = "INSERT INTO Product (user_id, type, Product_line1, Product_line2, city, state, postal_code, country, is_default, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)";
				const datos = [userId, type, ProductLine1, ProductLine2, city, state, postalCode, country, isDefault, date];
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

	updateProduct: async (req, res, next) => {
		const { type, ProductLine1, ProductLine2, city, state, postalCode, country, isDefault, ProductId } = req.body;
		const connection = await createConnection();
		const userId = req.session.userId;

		if (!userId) {
			return res.status(401).send("No autorizado");
		}

		try {
			if (!(await validateProduct(ProductId, userId, type))) {
				if (isDefault) {
					await connection.query("UPDATE Product SET is_default=NULL WHERE user_id=?", [userId]);
				}
				console.log("actualizadno");
				const query = "UPDATE Product SET type=?, Product_line1=?, Product_line2=?, city=?, state=?, postal_code=?, country=?, is_default=? WHERE id=? AND user_id=?";
				const datos = [type, ProductLine1, ProductLine2, city, state, postalCode, country, isDefault, Number(ProductId), userId];

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

async function validateProduct(ProductId, userId, type) {
	const connection = await createConnection();
	const query = "SELECT * FROM Product WHERE user_id=? AND type=?";
	try {
		const [Product] = await connection.query(query, [userId, type]);

		if (Product.length > 0) {
			if (ProductId !== undefined) {
				if (ProductId != Product[0].id) {
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

export default controllerMantProducts;
