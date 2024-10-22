import createConnection from "../../dbconnection/connection.js";

const controllerProducts = {
	macrameCollares: async (req, res, next) => {
		try {
			const connection = await createConnection(); // Obtener la conexión
			const [products] = await connection.query(
				"SELECT * FROM product WHERE category='alambre' AND sub_category='collares' AND product_status=1",
			);
			res.json(products);
			await connection.end();
		} catch (err) {
			next(new Error(err));
		}
	},
	macrameDijes: async (req, res, next) => {
		try {
			const connection = await createConnection(); // Obtener la conexión
			const [products] = await connection.query(
				"SELECT * FROM product WHERE category='alambre' AND sub_category='dijes' AND product_status=1",
			);
			res.json(products);
			await connection.end();
		} catch (err) {
			next(new Error(err));
		}
	},
	macrameBrazaletes: async (req, res, next) => {
		try {
			const connection = await createConnection(); // Obtener la conexión
			const [products] = await connection.query(
				"SELECT * FROM product WHERE category='alambre' AND sub_category='brazaletes' AND product_status=1",
			);
			res.json(products);
			await connection.end();
		} catch (err) {
			next(new Error(err));
		}
	},
};

export default controllerProducts;
