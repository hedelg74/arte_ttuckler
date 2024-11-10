import createConnection from "../../dbconnection/connection.js";

const controllerProducts = {
	macrameCollares: async (req, res, next) => {
		const connection = await createConnection(); // Obtener la conexión
		try {
			const [products] = await connection.query("SELECT * FROM product WHERE category='alambre' AND sub_category='collares' AND product_status=1");
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
			const [products] = await connection.query("SELECT * FROM product WHERE category='alambre' AND sub_category='dijes' AND product_status=1");
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
			const [products] = await connection.query("SELECT * FROM product WHERE category='alambre' AND sub_category='brazaletes' AND product_status=1");
			res.status(200).json(products);
		} catch (err) {
			next(err);
		} finally {
			await connection.end();
		}
	},
};

export default controllerProducts;
