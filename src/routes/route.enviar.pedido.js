import express from 'express';
import controllerEnviarPedido from '../controllers/controller.enviar.pedido.js';

const routerEnviarPedido = express.Router();

routerEnviarPedido.post('/enviar-pedido', controllerEnviarPedido);

export default routerEnviarPedido;
