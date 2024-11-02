import express from "express";
import controllerUser from "../controllers/controller.user.js";

const routerUser = express.Router();

routerUser.put("/users/profile", controllerUser.updatePersonalData);
routerUser.put("/users/password", controllerUser.updatePassword);
routerUser.get("/users/personal-data", controllerUser.loadPersonalData);

export default routerUser;
