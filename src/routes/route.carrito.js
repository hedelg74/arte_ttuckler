import express from 'express'
import controllerCarrito from "../controllers/controller.carrito.js"

const routerCarrito=express.Router()

// Route para servir index.html en la raíz del servidor
export default routerCarrito.get('/carrito', controllerCarrito)