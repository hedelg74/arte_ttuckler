 function insertarMenu () {
    const menu_container = document.getElementById('menu-container');

    const menuHTML =`
        <!-- BARRA VERTICAL -->
        <div class="menu-vertcical-container">
            <ul class="ul-v">
                <li class="menu-v">
                    <i class="bi bi-list "></i>
            
                    <nav class="nav-v">
                        <ul class="ul-v">
                            <li class="li-v"><a class="a-v" href="./index.html">Inicio</a></li>
                            <li class="li-v"><a class="a-v" href="./acercade.html">Acerca de</a></li>
                            <li class="li-v">
                                <a class="a-v" href="#">Productos <i class="bi bi-chevron-right"></i></a>
                                <ul class="ul-v">
                                    <li class="li-v">
                                        <a class="a-v" href="#">Macramé <i class="bi bi-chevron-right"></i></a>
                                        <ul class="ul-v">
                                            <li class="li-v"><a class="a-v" href="#">Aretes</a></li>
                                            <li class="li-v"><a class="a-v" href="#">Collares</a></li>
                                            <li class="li-v"><a class="a-v" href="#">Pulseras</a></li>
                                        </ul>
                                    </li>
                                    <li class="li-v">
                                        <a class="a-v" href="#">Cuero <i class="bi bi-chevron-right"></i></a>
                                        <ul class="ul-v">
                                            <li class="li-v"><a class="a-v" href="#">Aretes</a></li>
                                            <li class="li-v"><a class="a-v" href="#">Bolsos</a></li>
                                            <li class="li-v"><a class="a-v" href="#">Carteras</a></li>
                                            <li class="li-v"><a class="a-v" href="#">Pulseras</a></li>
                                        </ul>
                                    </li>
                                    <li class="li-v">
                                        <a class="a-v" href="#">Alambre <i class="bi bi-chevron-right"></i></a>
                                        <ul class="ul-v">
                                            <li class="li-v"><a class="a-v" href="#">Anillos</a></li>
                                            <li class="li-v"><a class="a-v" href="#">Aretes</a></li>
                                            <li class="li-v"><a class="a-v" href="#alambre-collares">Collares</a></li>
                                            <li class="li-v"><a class="a-v" href="#alambre-brazaletes">Brazaletes</a></li>
                                            <li class="li-v"><a class="a-v" href="#alambre-dijes">Dijes</a></li>
                                            <li class="li-v"><a class="a-v" href="#">Pulseras</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="li-v"><a class="a-h" href="#services">Servicios</a></li>
                            <li class="li-v"><a class="a-v" href="#contact">Contacto</a></li>
                        </ul>
                    </nav>
                </li>
            
            </ul>
        </div>
        <!-- BARRA HORIZONTAL -->
        <nav class="nav-h">
            <ul class="ul-h">
                <li class="li-h"><a class="a-h" href="#"><i class="bi bi-house"></i></a></li>
                <li class="li-h"><a class="a-h" href="#">Acerca de</a></li>
                <li class="li-h">
                    <a class="a-h" href="#">Productos <i class="bi bi-chevron-down"></i></a>
                    <ul class="ul-h">
                        <li class="li-h">
                            <a class="a-h"href="#">Macramé <i class="bi bi-chevron-right"></i></a>
                            <ul class="ul-h">
                                <li class="li-h"><a class="a-h" href="#">Aretes</a></li>
                                <li class="li-h"><a class="a-h" href="#">Collares</a></li>
                                <li class="li-h"><a class="a-h" href="#">Pulseras</a></li>
                            </ul>
                        </li>
                        <li class="li-h">
                            <a class="a-h" href="#">Cuero <i class="bi bi-chevron-right"></i></a>
                            <ul class="ul-h">
                                <li class="li-h"><a class="a-h" href="#">Aretes</a></li>
                                <li class="li-h"><a class="a-h" href="#">Bolsos</a></li>
                                <li class="li-h"><a class="a-h" href="#">Carteras</a></li>
                                <li class="li-h"><a class="a-h" href="#">Pulseras</a></li>
                            </ul>
                        </li>
                        <li class="li-h">
                            <a class="a-h" href="#">Alambre <i class="bi bi-chevron-right"></i></a>
                            <ul class="ul-h">
                                <li class="li-h"><a class="a-h" href="#">Anillos</a></li>
                                <li class="li-h"><a class="a-h" href="#">Aretes</a></li>
                                <li class="li-h"><a class="a-h" href="#alambre-collares">Collares</a></li>
                                <li class="li-h"><a class="a-h" href="#alambre-brazaletes">Brazaletes</a></li>
                                <li class="li-h"><a class="a-h" href="#alambre-dijes">Dijes</a></li>
                                <li class="li-h"><a class="a-h" href="#">Pulseras</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="li-h"><a class="a-h" href="#services">Servicios</a></li>
                <li class="li-h"><a class="a-h" href="#contact">Contacto</a></li>
            </ul>
            
        </nav>
        <div class="carrito-container">
            <ul class="submenu">
                <li>    
                   <i class="bi bi-cart4" id="icon-carrito"></i>
                    <div id="carrito">
                        <h1 class="text-green-500 mb-3">Carrtio de compras:</h1>
                        
                        
                        <table id="lista-carrito" class="border-b">
                           
                            <thead class="border-b">
                                
                                <tr class="text-sm text-left"">
                                    
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    
                                </tr>
                               
                            </thead>
                            
                            <tbody>
                                <!-- Aquí se deben agregar las filas del cuerpo de la tabla -->
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" class="px-4 py-2">Total</td>
                                    <td id="total" class="px-1 py-2 border-t">$ 0.00</td>
                                  
                                </tr>
                            </tfoot>
                            
                        </table>
                      
                        <a href="#" id="vaciar-carrito" class="btn-vaciar ml-1 text-sm text-red-400">Vaciar Carrito</a>
                        <a href="/carrito" id="ver-carrito" class="btn-enviar ml-36 text-sm text-blue-400">Ver carrito</a>

                    </div>
                </li>
            </ul>   
        </div>
    `;

    menu_container.innerHTML = menuHTML;

    
    
};

document.addEventListener('DOMContentLoaded',()=>{
    insertarMenu();
});



