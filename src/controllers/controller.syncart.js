const contrllerSyncCart = (req, res) => {
	const { cartItems } = req.body;
	req.session.cartItems = cartItems; // Almacenar el carrito en la sesión del usuario
	res.status(200).json({ success: true, message: "Carrito sincronizado con éxito" });
};

export default contrllerSyncCart;
