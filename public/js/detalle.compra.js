//document.addEventListener('DOMContentLoaded', () => {

    // Acceder al atributo personalizado
    const currentPage = window.pageName;



    const carrito = document.getElementById("carrito");
    const lista_carrito = document.querySelector("#lista-carrito tbody"); //tabla y cuerpo de la tabla
    const totalElement = document.getElementById("total");
    const impuestoVentas=document.getElementById("impuesto-ventas");
    const cartItemsNode = document.querySelector("#n-cart-items");
    const seguir_comprando = document.querySelector("#seguir-comprando");



    // Recuperar items del carrito de localStorage o inicializar un arreglo vacío si no existen
    function getCartItems() {
        const cartItems = localStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : [];
    }




    function cargarCarritoCompras() {
        const cartItems = getCartItems();

        if (cartItems) {
            cartItems.forEach(item => insertarCarrito(item));
            actualizarTotal();

        }

    }

    cargarCarritoCompras();

    function insertarCarrito(elemento) {




        let totalProductosRequeridos = Number(cartItemsNode.getAttribute("data-nItems"));

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
            if (currentPage === "carrito.html") img_hw = "h-20 w-20"
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


            `;
            totalProductosRequeridos+= Number(elemento.cantidad)
            setCartNitems(totalProductosRequeridos);
            lista_carrito.appendChild(row);
        }


    };



    function actualizarTotal() {
        let total = 0;
        let impuesto=0;
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
        impuesto=total*0.13;
        impuestoVentas.textContent=`$${impuesto.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;


        setCartNitems(nItems);

    }

    function setCartNitems(nItems){
        cartItemsNode.setAttribute("data-nItems", `${nItems}`)
        cartItemsNode.innerText = nItems;

    }



