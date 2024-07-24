import express from 'express'
import controllerIndex from "../controllers/controller.index.js"

const routerIndex=express.Router()

// Route para servir index.html en la raíz del servidor
export default routerIndex.get('/', controllerIndex)