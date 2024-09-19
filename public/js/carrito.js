//document.addEventListener('DOMContentLoaded', () => {

    // Acceder al atributo personalizado
    const currentPage = window.pageName;



    const carrito = document.getElementById("carrito");
    const lista_carrito = document.querySelector("#lista-carrito tbody"); //tabla y cuerpo de la tabla
    const limpiar_carrito = document.querySelector("#vaciar-carrito");
    const seguir_comprando = document.querySelector("#seguir-comprando");
    const totalElement = document.getElementById("total");
    const modalBackground = document.getElementById('modalBackground');
    const myModal = document.getElementById('myModal');
    const cartItemsNode = document.querySelector("#n-cart-items");


    let elemento1 = null;
    let elemento2 = null;
    let elemento3 = null;

    if (currentPage === 'index.html') {
        elemento1 = document.getElementById("img-container-alambre-collares");
        elemento2 = document.getElementById("img-container-alambre-brazaletes");
        elemento3 = document.getElementById("img-container-alambre-dijes");
    }

    function cargarEventListeners() {
        if (currentPage === 'index.html') {
            elemento1.addEventListener("click", comprarElemento);
            elemento2.addEventListener("click", comprarElemento);
            elemento3.addEventListener("click", comprarElemento);
        }

        carrito.addEventListener("click", eliminarElemento);
        limpiar_carrito.addEventListener("click", openModal);

        // Evitar la propagación de clics en el fondo
        modalBackground.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    };


    // Recuperar items del carrito de localStorage o inicializar un arreglo vacío si no existen
    function getCartItems() {
        const cartItems = localStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : [];
    }

    // Guardar items del carrito en localStorage
    function saveCartItems(cartItems) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Añadir un nuevo item al carrito y actualizar localStorage
    function addToCart(item) {
        const cartItems = getCartItems();
        cartItems.push(item);
        saveCartItems(cartItems);
        //renderCartItems();
    }

    // Eliminar un item del carrito por su id y actualizar localStorage
    function removeFromCart(id) {
        let cartItems = getCartItems();
        cartItems = cartItems.filter(item => item.id !== id);
        saveCartItems(cartItems);
        // renderCartItems();
    }
    // Limpiar el carrito del localStorage
    function clearCart() {
        localStorage.removeItem('cartItems');
    }


    function cargarCarritoCompras() {
        const cartItems = getCartItems();

        if (cartItems) {
            cartItems.forEach(item => insertarCarrito(item));
            actualizarTotal();

        }

    }

    cargarEventListeners();
    cargarCarritoCompras();



    //1 Primera funcion que llama el boton Agregar al carrito
    function comprarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")) {
            const elemento = e.target.parentElement;
            leerDatosElemento(elemento);
        };


    };
    // 2
    function leerDatosElemento(elemento) {
        const infoElemento = {
            id: elemento.querySelector(".agregar-carrito").getAttribute("data-id"),
            imagen: elemento.querySelector("img").src,
            titulo: elemento.querySelector("img").alt,
            cantidad: elemento.querySelector("#cantidad").value,
            precio: elemento.querySelector(".precio").textContent
        };

        insertarCarrito(infoElemento);
        addToCart(infoElemento);//Local storage
        actualizarTotal();
    };

    function insertarCarrito(elemento) {


        let totalProductosRequeridos = Number(cartItemsNode.getAttribute("data-nItems"));
        console.log(totalProductosRequeridos);
        const row_producto = document.getElementById(`${elemento.id}`);
        if (row_producto) {

            const cantidadProductoRequeridoAnterior = Number(row_producto.children[2].getAttribute('data-cantidad'));
            const cantidadProductoRequeridoActual = Number(elemento.cantidad);
            const totalProductoRequerido = cantidadProductoRequeridoAnterior + cantidadProductoRequeridoActual;
            const totalGeneralRequerido = cantidadProductoRequeridoActual + totalProductosRequeridos;

            setCartNitems(totalGeneralRequerido);
            row_producto.children[2].setAttribute("data-cantidad", `${totalProductoRequerido}`)
            row_producto.children[2].innerText = totalProductoRequerido.toString() + "x";

        } else {
            const row = document.createElement("tr");
            row.classList.add("text-sm")
            row.setAttribute("id", `${elemento.id}`);
            let img_hw = "h-8 w-8";
            if (currentPage === "carrito.html") img_hw = "h-36 w-36"
            row.innerHTML = `
                <td>
                    <img src="${elemento.imagen}" class="${img_hw} mt-1 rounded">
                </td>

                <td>
                    ${elemento.titulo}
                </td>
                <td class="text-right pr-4" data-cantidad="${elemento.cantidad}">
                    ${elemento.cantidad}x
                </td>
                <td class="precio text-right">
                    $ ${elemento.precio}
                </td>

                <td>
                    <a href="#" class="px-4 borrar hover:text-red-400" data-id="${elemento.id}"><i class="bi bi-trash borrar"></i></a>
                </td>

            `;
            totalProductosRequeridos+= Number(elemento.cantidad)
            setCartNitems(totalProductosRequeridos);
            lista_carrito.appendChild(row);
        }


    };


    function eliminarElemento(e) {
        //e.preventDefault();
        if (e.target.classList.contains("borrar")) {
            e.target.parentElement.parentElement.parentElement.remove();
            actualizarTotal();
            const elementoId = e.target.getAttribute("data-id");
            removeFromCart(elementoId);
        }
    };



    function vaciarCarrito() {

        while (lista_carrito.firstChild) {
            lista_carrito.removeChild(lista_carrito.firstChild);
        };
        actualizarTotal();
        clearCart();
        return false;

    };


    function actualizarTotal() {
        let total = 0;
        let nItems =0;
        //console.log(lista_carrito);
        const productos = lista_carrito.querySelectorAll("tr");
       // const cartItemsNode = document.querySelector("#n-cart-items");



        for (const producto of productos) {

            // Acceder correctamente a los elementos dentro del <tr>
            const cantidad = parseFloat(producto.querySelector("td[data-cantidad]").getAttribute("data-cantidad"));
            const precio = parseFloat(producto.querySelector(".precio").innerText.replace('$', ''));

            // Sumar al total
            total += cantidad * precio;
            nItems+=cantidad;
        }
        totalElement.textContent = `$${total.toFixed(2)}`;
        setCartNitems(nItems);

    }

    function setCartNitems(nItems){
        cartItemsNode.setAttribute("data-nItems", `${nItems}`)
        cartItemsNode.innerText = nItems;

    }

    function openModal() {
        modalBackground.classList.remove('hidden');
        myModal.classList.remove('hidden');
    }

    function closeModal() {
        modalBackground.classList.add('hidden');
        myModal.classList.add('hidden');
    }

    function confirmAction() {
        vaciarCarrito();
        closeModal();
    }

    // Exponer funciones globalmente para que puedan ser utilizadas en HTML
  /*   window.openModal = openModal;
    window.closeModal = closeModal;
    window.confirmAction = confirmAction;
 */
//});

