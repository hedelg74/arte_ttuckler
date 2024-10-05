document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // 1. Obtener los datos del formulario
    const formData = new FormData(this);

    // 2. Obtener los datos del carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('cartItems')) || [];

    // 3. Convertir los datos del formulario a un objeto
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // 4. Combinar los datos del formulario y del carrito
    const datosCompletos = {
        formData: formObject,  // Datos del formulario
        carrito: carrito       // Datos del carrito
    };

    // 5. Enviar los datos al servidor con fetch
    fetch('/enviar-pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosCompletos)
    })
    .then(response => {
        // Verifica si la respuesta no es OK y lanza un error si no lo es
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Pedido enviado con éxito!');
            this.reset();  // Limpia el formulario
            //localStorage.removeItem('cartItems');  // Vacía el carrito
        } else {
            console.error('Error en el pedido:', data);
            alert('Hubo un error al enviar el pedido.');
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        alert(`Error: ${error.message}`);
    });
});
