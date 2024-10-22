import express from "express";
import controllerLogIn from "../controllers/controller.login.js";

const routerLoginPage = express.Router();
routerLoginPage.get("/login", controllerLogIn.renderLoginPage);

export default routerLoginPage;
