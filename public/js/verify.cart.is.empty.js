const btnProccesOrder = document.getElementById("see-order");
function getCartItems() {
	const cartItems = localStorage.getItem("cartItems");
	return cartItems ? JSON.parse(cartItems) : [];
}

btnProccesOrder.addEventListener("click", (e) => {
	e.preventDefault();

	const cartItems = getCartItems();
	if (cartItems.length === 0) {
		window.location.href = "/empty-cart.html";
	} else {
		window.location.href = btnProccesOrder.href;
	}
});
