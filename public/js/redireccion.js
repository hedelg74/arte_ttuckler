
const link = document.getElementById('ver-carrito');



function getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

link.addEventListener('click', function(event) {
    const cartItems=getCartItems();
    event.preventDefault();
    if (cartItems.length > 0) {
        window.location.href = link.href;
    } else {
        alert('Aun no tienes productos en tu carrito de compras.');
    }
});
