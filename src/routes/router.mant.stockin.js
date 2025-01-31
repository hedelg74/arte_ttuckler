import express from "express";
import controllerMantStockIn from "../controllers/controller.mant.stockin.js"; 

const routerMantStockIn = express.Router();
routerMantStockIn.get("/mant-load-stockin", controllerMantStockIn.loadStockIn);
routerMantStockIn.get("/mant-load-stockin-list", controllerMantStockIn.loadStockInList);
routerMantStockIn.post("/mant-edit-stockin", controllerMantStockIn.loadStockInById);
routerMantStockIn.post("/mant-add-stockin", controllerMantStockIn.addStockIn);
routerMantStockIn.put("/mant-update-stockin", controllerMantStockIn.updateStockIn);
routerMantStockIn.delete("/mant-delete-stockin", controllerMantStockIn.deleteStockIn);

export default routerMantStockIn;