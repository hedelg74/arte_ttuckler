import express from "express";
import controllerMantProducts from "../controllers/controller.mant.products.js"; //controllerMantProducts

const routerMantProducts = express.Router();

routerMantProducts.get("/mant-load-product", controllerMantProducts.loadProduct);
routerMantProducts.post("/mant-add-product", controllerMantProducts.addProduct);
routerMantProducts.put("/mant-update-product", controllerMantProducts.updateProduct);

export default routerMantProducts;
