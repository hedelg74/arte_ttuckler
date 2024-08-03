


document.addEventListener('DOMContentLoaded', () => {
 
    // Acceder al atributo personalizado
    const currentPage= window.pageName;

    console.log('La página actual es: ' + currentPage);
    
    const carrito = document.getElementById("carrito");
    const lista_carrito = document.querySelector("#lista-carrito tbody"); //tabla y cuerpo de la tabla
    //const limpiar_carrito = document.querySelector("#vaciar-carrito");
    const seguir_comprando = document.querySelector("#seguir-comprando");
    const totalElement = document.getElementById("total");
    
    let elemento1 = null;
    let elemento2 = null;
    let elemento3=null;

    if (currentPage === 'index.html') {
        elemento1 = document.getElementById("img-container-alambre-collares");
        elemento2 = document.getElementById("img-container-alambre-brazaletes");
        elemento3 = document.getElementById("img-container-alambre-dijes");
    }

    

    function cargarEventListeners(){
        if (currentPage === 'index.html') {
            elemento1.addEventListener("click",comprarElemento);
            elemento2.addEventListener("click",comprarElemento);
            elemento3.addEventListener("click",comprarElemento);
        }

        carrito.addEventListener("click",eliminarElemento);
        //limpiar_carrito.addEventListener("click",openModal);
       
        
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
        renderCartItems();
    }
      // Limpiar el carrito del localStorage
    function clearCart() {
        localStorage.removeItem('cartItems');
    }


    function cargarCarritoCompras(){
        const cartItems=getCartItems();
        if(cartItems){
            cartItems.forEach(item=>insertarCarrito(item));
            actualizarTotal();

        }

    }

    cargarEventListeners();
    cargarCarritoCompras();
    



    function comprarElemento(e){
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")){
            const elemento=e.target.parentElement;
            leerDatosElemento(elemento);
        };

    
    };

    function leerDatosElemento(elemento){
        const infoElemento={
            id : elemento.querySelector(".agregar-carrito").getAttribute("data-id"),
            imagen : elemento.querySelector("img").src,
            titulo : elemento.querySelector("img").alt,
            precio :  elemento.querySelector(".precio").textContent    
        };

        insertarCarrito(infoElemento);
        addToCart(infoElemento);
        actualizarTotal();
    };

    function insertarCarrito(elemento){

        const row=document.createElement("tr");
        row.classList.add("text-sm")
        let img_hw="h-8 w-8";
        if(currentPage==="carrito.html") img_hw="h-36 w-36" 
        row.innerHTML=`
            <td>
                <img src="${elemento.imagen}" class="${img_hw} mt-1 rounded">
            </td>
            
            <td>
                ${elemento.titulo}
            </td>

            <td class="precio text-left">
                $ ${elemento.precio}
            </td>

            <td>
                <a href="#" class="borrar hover:text-red-400" data-id="${elemento.id}"><i class="bi bi-trash borrar"></i></a>
            </td>
            
        `;

        lista_carrito.appendChild(row);
        

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



    function vaciarCarrito(){
        
        while(lista_carrito.firstChild){
            lista_carrito.removeChild(lista_carrito.firstChild);
        };
        actualizarTotal();
        clearCart();
        return false;

    };


    function actualizarTotal() {
        let total = 0;
        const precios = lista_carrito.querySelectorAll('.precio');
        precios.forEach(precio => {
            total += parseFloat(precio.textContent.replace('$', ''));
        });
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    function openModal() {
        document.getElementById('myModal').classList.remove('hidden');
    }
    
    function closeModal() {
        document.getElementById('myModal').classList.add('hidden');
    }
    
    function confirmAction() {
        vaciarCarrito();
        closeModal();
    }
     // Exponer funciones globalmente para que puedan ser utilizadas en HTML
     window.openModal = openModal;
     window.closeModal = closeModal;
     window.confirmAction = confirmAction;

});

