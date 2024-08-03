import express from 'express';
import controllerPedido from '../controllers/controller.pedido.js';

const routerPedido = express.Router();

routerPedido.get('/', controllerPedido);

export default routerPedido;
