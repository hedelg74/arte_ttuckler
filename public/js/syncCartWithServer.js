// Función para sincronizar el carrito de localStorage con el servidor al cargar la página
export function syncCartWithServer() {
	const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

	fetch("/sync-cart", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ cartItems }),
	}).catch((error) => {
		console.error("Error al sincronizar el carrito:", error);
	});
}

// Llama a la función cada vez que la página se cargue
document.addEventListener("DOMContentLoaded", function () {
	syncCartWithServer();
});
