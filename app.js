// server.js
import express from 'express';
import path from 'path' //import { join } from 'path';

import { fileURLToPath } from 'url';
import routeIndex from './src/routes/route.index.js';
import routeProductos from './src/routes/route.productos.js';
import routerPedido from './src/routes/route.pedido.js';
import routerCarrito from './src/routes/route.carrito.js';

//import routerCountry from './src/routes/route.countries.js';

import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MiDDLEWARES--------------------------------------------------------- 

//para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//  ROUTES--------------------------------------------------------------

//app.use(routerCountry);

// para servir index.html en la raíz del servidor
app.use(routeIndex);

// para servir pedido.html en la raíz del servidor
app.use('/pedido',routerPedido);

// para servir carrito.html en la raíz del servidor
app.use(routerCarrito);


// Endpoint para obtener la lista de imágenes
app.use(routeProductos)

//ERRORES---------------------------------------------------------------
//app.use((err,req,res,next)=>{
//    res.send({error:err.message})
//});

// MANEJO DE ERRORES---------------------------------------------------
app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});

//Servimmos page 404.html
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'./public/404.html'))
})

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
