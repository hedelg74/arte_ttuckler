// Manejador del evento 'submit' del formulario
document.querySelector("form").addEventListener("submit", handleFormSubmit);

// Función principal para manejar el envío del formulario
function handleFormSubmit(event) {
	event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

	const formData = getFormData(this);
	const cartItems = getCartItemss();
	const completedData = combineFormDataAndCart(formData, cartItems);

	sendDataToServer(completedData).then(handleServerResponse).catch(handleError);
}

// Obtener datos del formulario como un objeto
function getFormData(formElement) {
	const formData = new FormData(formElement);
	const formObject = {};
	formData.forEach((value, key) => {
		formObject[key] = value;
	});
	return formObject;
}

// Obtener los elementos del carrito desde localStorage
function getCartItemss() {
	return JSON.parse(localStorage.getItem("cartItems")) || [];
}

// Combinar los datos del formulario y del carrito
function combineFormDataAndCart(formData, cartItems) {
	return {
		formData, // Datos del formulario
		cartItems, // Datos del carrito
	};
}

// Enviar los datos al servidor usando fetch
function sendDataToServer(data) {
	return fetch("/process-order", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((response) => {
		if (!response.ok) {
			return response.json().then((err) => {
				throw new Error(err.message);
			});
		}
		return response.json();
	});
}

// Manejar la respuesta del servidor
function handleServerResponse(data) {
	if (data.success) {
		alert("Pedido enviado con éxito!");
		document.querySelector("form").reset(); // Limpiar el formulario
		// localStorage.removeItem('cartItems');  // Descomentar para vaciar el carrito
	} else {
		console.error("Error en el pedido:", data);
		alert("Hubo un error al enviar el pedido.");
	}
}

// Manejar errores al enviar los datos
function handleError(error) {
	console.error("Error al enviar los datos:", error);
	alert(`Error: ${error.message}`);
}
