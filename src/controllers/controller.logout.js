const controllerLogOut = (req, res) => {
	// Eliminar la cookie llamada 'token'
	res.clearCookie("token", {
		httpOnly: true,
		secure: true,
		sameSite: "Strict",
		path: "/", // Asegúrate de que coincida con las opciones de la cookie original
	});

	// Opcional: también puedes destruir la sesión si estás usando sesiones basadas en cookies
	req.session = null;

	// Responder al cliente indicando que el logout fue exitoso
	res.status(200).send({ message: "Logout exitoso" });
};

export default controllerLogOut;
