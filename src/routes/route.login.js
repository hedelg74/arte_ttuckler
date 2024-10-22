import express from "express";
import controllerLogIn from "../controllers/controller.login.js";

const routerLogIn = express.Router();
routerLogIn.post("/login", controllerLogIn.logIn);

export default routerLogIn;
