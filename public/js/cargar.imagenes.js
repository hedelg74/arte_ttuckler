async function cargarImagenes(api,img_contenedor) {
    try {
        const response = await fetch(api);
        const productos= await response.json();

       
       
        const contenedor = document.getElementById(img_contenedor);
        contenedor.classList.add("grid","sm:grid-cols-2" ,"md:grid-cols-3" ,"lg:grid-cols-4","justify-center","gap-y-10","m-10")
        const hr_line=document.createElement('hr')
        
        document.body.appendChild(hr_line);

        productos.forEach(producto => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figure_caption = document.createElement('figcaption');
            const input_cantidad=document.createElement('input');
            const btn_agregar=document.createElement('button');
            const div_precio_cantidad=document.createElement('div');
            const cart=document.createElement('i');
            const label_precio_titulo=document.createElement("label");
            const label_precio=document.createElement("label");
           
               
            img.src =producto.path;
            img.alt=producto.nombre;
            img.classList.add("rounded","block","transform","scale-120","bg-[#B6B6F2]","h-52","w-52","m-2");
 
            
            input_cantidad.value="1";
            input_cantidad.classList.add("cantidad","w-10","border","border-1","border-gray-500","rounded","bg-[#2a3139]","text-[#d4d8de]"); 
            input_cantidad.setAttribute("type","number");
            input_cantidad.setAttribute("id","cantidad");
            input_cantidad.setAttribute("min","1");
            input_cantidad.required=true;

            label_precio_titulo.textContent="Precio $";
            label_precio.textContent=producto.precio;
            label_precio.setAttribute("for","cantidad")
            label_precio.classList.add("precio")
            cart.classList.add("bi","bi-cart-plus");


            figure_caption.classList.add("flex","justify-center","gap-4","text-sm","text-[#ffffff]");
            figure_caption.appendChild(label_precio_titulo);
            figure_caption.appendChild(label_precio);
            figure_caption.appendChild(input_cantidad);


            btn_agregar.appendChild(cart);
            btn_agregar.append(" Agregar");
            btn_agregar.classList.add("agregar-carrito","p-2","m-5","rounded","text-sm","text-[#15cfc6]","bg-[#153937]","hover:bg-[#15cfc6]","hover:text-[#153937]","transition-transition-colors")
            btn_agregar.setAttribute("data-id",`${producto.id}`)
            
            

            div_precio_cantidad.appendChild(figure_caption);
            div_precio_cantidad.classList.add("flex","justify-center")
            
            figure.appendChild(img);
            figure.appendChild(div_precio_cantidad);
            figure.appendChild(btn_agregar);
            figure.classList.add("bg-[#252a33]","rounded","flex","flex-col","items-center","w-60","border","border-1","border-[#242430]","hover:border-[#4377bb]","transform","hover:scale-110")
      
           
            contenedor.appendChild(figure);

        });
    } catch (error) {
        console.error('Error al cargar las imágenes:', error);
    }
}

//window.onload=cargarImagenes; 