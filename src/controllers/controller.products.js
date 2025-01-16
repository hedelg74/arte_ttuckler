import createConnection from "../../dbconnection/connection.js";

const controllerProducts = {
	macrameCollares: async (req, res, next) => {
		const connection = await createConnection(); // Obtener la conexión
		try {
			const [products] = await connection.query("SELECT * FROM product WHERE id_category=3 AND id_sub_category=2 AND product_status=1");
			res.status(200).json(products);
		} catch (err) {
			next(err);
		} finally {
			await connection.end();
		}
	},
	macrameDijes: async (req, res, next) => {
		const connection = await createConnection(); // Obtener la conexión
		try {
			const [products] = await connection.query("SELECT * FROM product WHERE id_category=3 AND id_sub_category=9 AND product_status=1");
			res.status(200).json(products);
		} catch (err) {
			next(err);
		} finally {
			await connection.end();
		}
	},
	macrameBrazaletes: async (req, res, next) => {
		const connection = await createConnection(); // Obtener la conexión
		try {
			const [products] = await connection.query("SELECT * FROM product WHERE id_category=3 AND id_sub_category=8 AND product_status=1");
			res.status(200).json(products);
		} catch (err) {
			next(err);
		} finally {
			await connection.end();
		}
	},
};

export default controllerProducts;
