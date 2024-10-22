import express from "express";
import controllerOrderPage from "../controllers/controller.order.page.js";
import authenticateToken from "../middlewares/authenticate.token.js";
import checkCartItems from "../middlewares/check.cartItems.js";

const routerOrderPage = express.Router();

routerOrderPage.use(authenticateToken);

routerOrderPage.get("/order", checkCartItems, controllerOrderPage.renderOrderPage);

export default routerOrderPage;
