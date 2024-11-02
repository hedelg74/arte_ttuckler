import express from "express";
import controllerOrderPage from "../controllers/controller.order.page.js";

const routerOrderPage = express.Router();

routerOrderPage.get("/order", controllerOrderPage.renderOrderPage);

export default routerOrderPage;
