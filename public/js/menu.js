

  // Selecciona todos los elementos .menu-item
  const submenuUno = document.querySelector('.submenu-uno');
  const childrenUno=submenuUno.querySelector(".children-uno");
  const arrowSubUno=submenuUno.querySelector(".bi-chevron-right");


  submenuUno.addEventListener("click", function(event) {

    let height=0;
    submenuUno.classList.toggle("active");
    arrowSubUno.classList.toggle("arrow")

    if (submenuUno.classList.contains("active")){
      if(childrenUno.clientHeight=="0"){
        height=childrenUno.scrollHeight;

      }
    }else{
      closeMenu();
    };

    childrenUno.style.height=`${height}px`;
  });

  const submenuDos=childrenUno.querySelectorAll(".submenu-dos");

// Definir isMobile fuera del evento
let isMobile = window.matchMedia("(max-width: 768px)");
//let isTablet=window.matchMedia("(max-width: 768px)");

// Actualizar isMobile en el evento de redimensionado
window.addEventListener('resize', () => {
  isMobile = window.matchMedia("(max-width: 768px)");
  //isTablet=window.matchMedia("(max-width: 768px)");
});


  submenuDos.forEach(item=>{
    item.addEventListener("click", function(event) {
      event.stopPropagation();
      item.classList.toggle("active");

      const childrenDos=item.querySelector(".children-dos");

      const arrowSubDos = item.querySelector(".bi-chevron-right");
      if (isMobile.matches) {
        arrowSubDos.classList.toggle("arrow");
      };

      let height=0;

      if (item.classList.contains("active")){
        if(childrenDos.clientHeight=="0"){
          childrenDos.style.display="block";
          height=childrenDos.scrollHeight;
          childrenDos.style.height=`${height}px`;
        };
      }else{
        childrenDos.style.height=`${height}px`;
        setTimeout(function() {
          childrenDos.style.display="none";
        }, 3000);
      };

      childrenUno.style.height="auto";
    });
  });


  submenuUno.addEventListener("mouseleave",function(event){

  closeMenu()

});

function closeMenu(){
  submenuUno.classList.remove("active");
  arrowSubUno.classList.remove("arrow");

  childrenUno.style.height="0px";
 // childrenUno.style.overflow = "hidden"; // Asegúrate de que el contenido no sea visible al tener altura 0

  // Restablecer el estado de todos los submenús .submenu-dos
  submenuDos.forEach(item => {
    item.classList.remove("active");

    const arrowSubDos = item.querySelectorAll(".bi-chevron-right");
    arrowSubDos.forEach(arrow => {
      arrow.classList.remove("arrow");
    });
  });

  const childrenDos=document.querySelectorAll(".children-dos");
  childrenDos.forEach(item=>{
    item.style.height="0px";
    item.style.display="none";
   // childrenDos.style.overflow = "hidden"; // Asegura que el contenido no se muestre

  });

};

//document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      const currentURL = window.location.href.split('#')[0]; // URL actual sin fragmento
      const targetURL = this.href.split('#')[0]; // URL del enlace sin fragmento

      if (href === '#') {
        // Si el enlace es simplemente "#", previene el comportamiento por defecto
        event.preventDefault();
      } else if (href.startsWith('#') || currentURL === targetURL) {
        // Si el enlace es un ancla o va a la misma página
        event.preventDefault();


        if (isMobile.matches){
          const inputCheckBox=document.getElementById("input-check");
          inputCheckBox.checked=false;
        }else closeMenu(); // Llama a la función que cierra el menú
;
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const navHeight = document.querySelector('nav').offsetHeight; // Altura de la barra de navegación
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

          // Desplazamiento manual ajustado
          window.scrollTo({
            top: targetPosition - 50,
            behavior: 'smooth'
          });
        };
      };
    });
  });
//});




// Agrega un elemento div para mostrar los logs
/* const logElement = document.createElement('div');
logElement.setAttribute('id', 'console-log');
logElement.style.position = 'fixed';
logElement.style.bottom = '0';
logElement.style.left = '0';
logElement.style.width = '100%';
logElement.style.height = '100px';
logElement.style.overflowY = 'scroll';
logElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
logElement.style.color = 'white';
logElement.style.zIndex = '800';
document.body.appendChild(logElement);

console.log = function(message) {
  const newLog = document.createElement('div');
  newLog.textContent = message;
  logElement.appendChild(newLog);
};
 */


