
import createConnection from "../../dbconnection/connection.js";

const controllerMantStockIn = {
	loadStockIn: async (req, res, next) => {
		const connection = await createConnection();
		//const userId = req.session.userId;

		try {
			const query = "SELECT * FROM stock_in";

			const [data] = await connection.query(query);
			if (data.length > 0) {
				res.status(200).json({ success: true, data });
			} else {
				res.status(404).json({ success: false, message: "No hay entradas para mostrar" });
			}
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},
	loadStockInList: async (req, res, next) => {
		const connection = await createConnection();

		try {
			const query = "SELECT * FROM stock_in";

			const [data] = await connection.query(query);
			
			res.render("./partials/list.stockin.ejs", { data });
			
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},
	loadStockInById: async (req, res, next) => {
		const connection = await createConnection();
		const stockinId = req.body.id;

		
		try {
			const query = `
            SELECT
				e.id, 
                e.document,
                e.document_date,
                e.in_type,
				e.total_document,
				p.image_path,
                d.product_id,
                d.quantity,
				d.price
            FROM 
                stock_in e
            INNER JOIN 
                stock_in_detail d ON e.id = d.stockin_id
			INNER JOIN
				product p ON d.product_id = p.id
            WHERE 
                e.id = ?`;

			const [data] = await connection.query(query, [stockinId]);
			console.log(data);
			if (data.length > 0) {
				res.status(200).json({ success: true, data });
			} else {
				res.status(404).json({ success: false, message: "No hay entradas para mostrar" });
			}
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},

	addStockIn: async (req, res, next) => {
		const { document,document_date, in_type, total_document, detalle } = req.body;
		
		const connection = await createConnection();
		
		try {
			await connection.beginTransaction();
				const query = "INSERT INTO stock_in (document, document_date, in_type, total_document) VALUES (?, ?, ?, ?)";
				const data = [document,document_date, in_type, total_document];
				await connection.query(query, data);
				const [stockin] = await connection.query("SELECT LAST_INSERT_ID() as document_id");
				const document_id = stockin[0].document_id;

				const query2 = "INSERT INTO stock_in_detail (stockin_id, product_id, quantity, price) VALUES (?,?,?,?)";
				const data2 = detalle.map((item) => [document_id, item.product_id, item.quantity, item.price]);
				data2.forEach(async (item) => {
					await connection.query(query2, item);
				});
			
				const query3 = "UPDATE product SET stock= stock + ? WHERE id=?";
				const data3 = detalle.map((item) => [item.quantity, item.product_id]);
				data3.forEach(async (item) => {
					await connection.query(query3, item);
				});
			connection.commit();

			res.status(200).json({ success: true, message: "Entrada ha sido agregada.", data });
		
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},

	updateStockIn: async (req, res, next) => {
		const { id,documet, document_date, total_document } = req.body;
		const connection = await createConnection();
		
		try {
			
			const query = "UPDATE stock_in SET document=?, document_date=?, total_document=? WHERE id=?";
			const data = [documet, document_date, total_document, Number(id)];

			await connection.query(query, data);
			res.status(200).json({ success: true, message: "Entrada actualizada.", data });
			
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	},
	deleteStockIn: async (req, res, next) => {
		const connection = await createConnection();
		const stockinId = req.body.id;
		try {
			const [stockin] = await connection.query(`SELECT stock_in_detail.product_id
				FROM stock_in_detail
				INNER JOIN stock_out_detail
				ON stock_in_detail.product_id = stock_out_detail.product_id`);
			if (stockin.length > 0) {
				res.status(400).json({ success: false, message: "No se puede eliminar la entrada porque ya esta en uso." });
				return;
			}

			await connection.beginTransaction();

			// Primero elimina los registros relacionados en stock_in_detail
			await connection.query(`
				DELETE stock_in_detail
				FROM stock_in_detail
				JOIN stock_in ON stock_in_detail.stockin_id = stock_in.id
				WHERE stock_in.id = ?`,  [stockinId]);

			// Luego elimina el registro en stock_in
			await connection.query(`DELETE FROM stock_in WHERE id = ?`, [stockinId]);

        	await connection.commit();
			
			res.status(200).json({ success: true, message: "Entrada eliminada." });
		} catch (error) {
			next(error);
		} finally {
			await connection.end();
		}
	}
};


export default controllerMantStockIn;
