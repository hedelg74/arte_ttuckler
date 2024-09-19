document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href="#"]');
  links.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault(); // Previene el comportamiento por defecto
      });
  });
});

  // Selecciona todos los elementos .menu-item
  const submenuUno = document.querySelector('.submenu-uno');
  const childrenUno=submenuUno.querySelector(".children-uno");
  const arrowUno=submenuUno.querySelector(".bi-chevron-right");


  submenuUno.addEventListener("click", function(event) {

    let height=0;
    submenuUno.classList.toggle("active");
    arrowUno.classList.toggle("arrow")

    if (submenuUno.classList.contains("active")){
      if(childrenUno.clientHeight=="0"){
        height=childrenUno.scrollHeight;

      }
    };

    childrenUno.style.height=`${height}px`;
  });

  const submenuDos=childrenUno.querySelectorAll(".submenu-dos");

  submenuDos.forEach(item=>{
    item.addEventListener("click", function(event) {
      event.stopPropagation();
      item.classList.toggle("active");
      const childrenDos=item.querySelector(".children-dos");
      if (item.classList.contains("active")){
          childrenDos.style.display="block";
      }else{
        childrenDos.style.display="none";
      };
      childrenUno.style.height="auto";
  });
});




childrenUno.addEventListener("mouseleave",function(event){

          submenuUno.classList.remove("active");
          childrenUno.style.height="0px";
          arrowUno.classList.remove("arrow");


});





window.addEventListener('resize', () => {
  const isMobile = window.matchMedia("(max-width: 768px)");

  if (isMobile.matches) {
    // Código para dispositivos móviles
    console.log("Estás en un dispositivo móvil");
  } else {
    // Código para pantallas más grandes
    console.log("No estás en un dispositivo móvil");
  }
});

