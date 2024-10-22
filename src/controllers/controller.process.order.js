// orderProcessor.js
import createConnection from "../../dbconnection/connection.js";
import sendOrderConfirmationEmail from "./mailer.js";

const processOrder = async (req, res) => {
	try {
		const { formData, cartItems } = req.body;

		// SQL query to insert customer information
		const customerQuery = `
      INSERT INTO customer (name, last_name, address, city, state, country, postal_code, email, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

		const customerValues = [
			formData.name,
			formData["last-name"],
			formData.address,
			formData.city,
			formData.state,
			formData.country,
			formData["postal-code"],
			formData.email,
			formData["phone-number"],
		];

		const connection = await createConnection();

		// Insert customer
		await connection.query(customerQuery, customerValues);

		// Retrieve the last inserted customer ID
		const [customerResult] = await connection.query("SELECT LAST_INSERT_ID() as customer_id");

		if (customerResult.length > 0) {
			const customerId = customerResult[0].customer_id;

			// Insert order linked to the customer
			await connection.query("INSERT INTO orders (customer_id) VALUES (?)", [customerId]);

			// Retrieve the last inserted order ID
			const [orderResult] = await connection.query("SELECT LAST_INSERT_ID() as order_id");

			if (orderResult.length > 0) {
				const orderId = orderResult[0].order_id;

				// Insert each product in the order details
				const orderDetailsQuery = `INSERT INTO order_detail (order_id, product_id, quantity, price) VALUES (?,?,?,?)`;

				for (const item of cartItems) {
					const orderDetailsValues = [orderId, item.id, item.quantity, item.price];
					await connection.query(orderDetailsQuery, orderDetailsValues);
				}

				// Close the database connection
				await connection.end();

				// Send the order confirmation email
				await sendOrderConfirmationEmail(formData, cartItems, orderId);

				// Send a successful response to the frontend
				res.status(200).json({
					success: true,
					message: "Order processed successfully",
					data: req.body,
				});
			} else {
				console.log("Order not found");
				res.status(404).json({ success: false, message: "Order not found" });
			}
		} else {
			console.log("Customer not found");
			res.status(404).json({ success: false, message: "Customer not found" });
		}
	} catch (error) {
		console.error("Error processing order:", error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export default processOrder;
