import express from "express";
import controllerMantCategory from "../controllers/controller.mant.category.js"; 

const routerMantCategory = express.Router();
routerMantCategory.get("/mant-load-category", controllerMantCategory.loadCategory);
routerMantCategory.post("/mant-edit-category", controllerMantCategory.loadCategoryById);
routerMantCategory.post("/mant-add-category", controllerMantCategory.addCategory);
routerMantCategory.put("/mant-update-category", controllerMantCategory.updateCategory);

export default routerMantCategory;
