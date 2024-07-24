
document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById("carrito");
    const lista_carrito = document.querySelector("#lista-carrito tbody"); //tabla y cuerpo de la tabla
    const limpiar_carrito = document.querySelector("#vaciar-carrito");
    const totalElement = document.getElementById("total");
    const elemento1 = document.getElementById("img-container-alambre-collares");
    const elemento2 = document.getElementById("img-container-alambre-brazaletes");
    const elemento3 = document.getElementById("img-container-alambre-dijes");

    

    function cargarEventListeners(){
        
        elemento1.addEventListener("click",comprarElemento);
        elemento2.addEventListener("click",comprarElemento);
        elemento3.addEventListener("click",comprarElemento);
        
        carrito.addEventListener("click",eliminarElemento);
        limpiar_carrito.addEventListener("click",vaciarCarrito);
        
    };



    cargarEventListeners();
    




    function comprarElemento(e){
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")){
            const elemento=e.target.parentElement;
            leerDatosElemento(elemento);
        };

    
    };

    function leerDatosElemento(elemento){
        const infoElemento={
            imagen : elemento.querySelector("img").src,
            titulo : elemento.querySelector("img").alt,
            precio :  elemento.querySelector(".precio").textContent,
            id : elemento.querySelector(".agregar-carrito").getAttribute("data-id")
        };

        console.log(infoElemento);
        insertarCarrito(infoElemento);
        actualizarTotal();
    };

    function insertarCarrito(elemento){

        const row=document.createElement("tr");
        row.classList.add("text-sm")
        
        row.innerHTML=`
            <td>
                <img src="${elemento.imagen}" class="h-8 w-8 mt-1">
            </td>
            
            <td>
                ${elemento.titulo}
            </td>

            <td class="precio text-left">
                ${elemento.precio}
            </td>

            <td>
                <a href="#" class="borrar hover:text-red-400" data-id="${elemento.id}"><i class="bi bi-cart-x borrar"></i></a>
            </td>
            
        `;

        lista_carrito.appendChild(row);
        

    };

    
    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains("borrar")) {
            e.target.parentElement.parentElement.parentElement.remove();
            actualizarTotal();
            const elementoId = e.target.getAttribute("data-id");
            console.log(`Elemento con ID ${elementoId} eliminado`);
        }
    };

   
    function vaciarCarrito(){
        while(lista_carrito.firstChild){
            lista_carrito.removeChild(lista_carrito.firstChild);
        };
        actualizarTotal();
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

});

