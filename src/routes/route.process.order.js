import express from "express";
import controllerProcessOrder from "../controllers/controller.process.order.js";

const routerProcessOrder = express.Router();

routerProcessOrder.post("/process-order", controllerProcessOrder);

export default routerProcessOrder;
