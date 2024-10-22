import express from "express";
import contrllerSyncCart from "../controllers/controller.syncart.js";

const routerSyncCart = express.Router();
routerSyncCart.post("/sync-cart", contrllerSyncCart);

export default routerSyncCart;
