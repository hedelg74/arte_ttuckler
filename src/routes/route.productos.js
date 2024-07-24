import express from 'express'
import controllerProductos from "../controllers/controller.productos.js"

const routerProductos=express.Router();

// Route para servir coleccion alambre
routerProductos.get('/api/images/alambre/collares', controllerProductos.macrameCollares);
routerProductos.get('/api/images/alambre/brazaletes', controllerProductos.macrameBrazaletes)
routerProductos.get('/api/images/alambre/dijes', controllerProductos.macrameDijes)





export default routerProductos