

const carrito = document.getElementById("#carrito");

const elemento1 = document.getElementById("#alambre-collares");
const elemento2 = document.getElementById("#img-container-alambre-brazaletes");
const elemento3 = document.getElementById("#img-container-alambre-dijes");

const lista_carrito = document.getElementById("#carrito tbody"); //tabla y cuerpo de la tabla
const vaciar_carrito = document.getElementById("#vaciar-carrito");


function cargarEventListeners(){
    
    carrito.addEventListener("click",eliminarElemento);

    elemento1.addEventListener("click",console.log("Hola desde aqui"));
    elemento2.addEventListener("click",comprarElemento);
    elemento3.addEventListener("click",comprarElemento);

    vaciar_carrito.addEventListener("click",vaciarCarrito);
    
};


function comprarElemento(e){
    e.preventDefault();
    if (e.target.classList.contains("anadir-carrito")){
        const elemento=e.parentElement.parentElement;
        leerDatosElemento(elemento);
    };

    console.log("si aca")

};

function leerDatosElemento(elemento){
    const infoElemento={
        imagen : elemento.querySelector("img").src,
        titulo : elemento.querySelector("img").alt,
        precio :  elemento.querySelector(".precio").textContent,
        id : document.querySelector(".agregar-carrito").getAttribute("data-id")
    };

    console.log(infoElemento);
    insertarCarrito(infoElemento);
};

function insertarCarrito(elemento){

    const row=document.createElement("tr");
    row.innerHTML=`
        <td>
            <img src="${elemento.imagen}" width=100>
        </td>
           
        <td>
             ${elemento.titulo}
        </td>

        <td>
            ${elemento.precio}
        </td>

        <td>
            <a href="#" class="borrar" data-di="${elemento.id}">X</a>
        </td>
        
    `;

    lista_carrito.appendChild(row);

};


function eliminarElemento(e){
    e.preventDefault();
    let elemento, elementoId;

    if(e.target.classList.contains("borrar")){
        e.target.parentElement.parentElement.remove();
        elemento=e.target.parentElement.parentElement;
        elementoId=e.target.querySelector("a").getAttribute("data-id");
    };

};


function vaciarCarrito(){
    while(lista_carrito.firstChild){
        lista_carrito.removeChild(firstChild);
    };

    return false;

};