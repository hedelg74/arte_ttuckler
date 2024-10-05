// server.js
import express from 'express';
import path from 'path'; //import { join } from 'path';

import cors from 'cors';
import { fileURLToPath } from 'url';
import routerCarrito from './src/routes/route.carrito.js';
import routerEnviarPedido from './src/routes/route.enviar.pedido.js';
import routeIndex from './src/routes/route.index.js';
import ipRoutes from './src/routes/route.ip.js';
import routerPedido from './src/routes/route.pedido.js';
import routeProductos from './src/routes/route.productos.js';


//import routerCountry from './src/routes/route.countries.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Configura CORS
/* app.use(cors({
    origin: 'https://697f-186-151-108-146.ngrok-free.app', // Cambia esto a la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Si necesitas enviar cookies
})); */
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MiDDLEWARES---------------------------------------------------------
/* app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com 'unsafe-inline';"
    );
    next();
  });
 */
//para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Servir los archivos estáticos (intl-tel-input)
app.use(express.static(path.join(__dirname, 'node_modules/intl-tel-input/build')));


//  ROUTES--------------------------------------------------------------

//app.use(routerCountry);

// para servir index.html en la raíz del servidor
app.use(routeIndex);

// para servir pedido.html en la raíz del servidor
app.use('/pedido',routerPedido);

// para recibir el pedido
app.use(routerEnviarPedido);


// para servir carrito.html en la raíz del servidor
app.use(routerCarrito);


// Endpoint para obtener la lista de imágenes
app.use(routeProductos)

// Usar el router para las rutas de IP
app.use('/api', ipRoutes);

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
