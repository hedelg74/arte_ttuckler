// server.js
import "dotenv/config";
import express from "express";
import session from "express-session";
import path from "path";

import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";

import routerAuth from "./src/routes/route.auth.js";
import routerEmptyCartPage from "./src/routes/route.emptycart.page.js";
import routerForgotPassword from "./src/routes/route.forgot.password.js";
import routerHomePage from "./src/routes/route.home.page.js";
import routerLogIn from "./src/routes/route.login.js";
import routerLogOut from "./src/routes/route.logout.js";
import routerOrderPage from "./src/routes/route.order.page.js";
import routerProcessOrder from "./src/routes/route.process.order.js";
import routeProducts from "./src/routes/route.products.js";
import routerResetPassword from "./src/routes/route.reset.password.js";
import routerSetPassword from "./src/routes/route.set.password.js";
import routerSignUp from "./src/routes/route.signup.js";
import routerSyncCart from "./src/routes/route.syncart.js";
import routerLoginPage from "./src/routes/router.login.page.js";

//import routerCountry from './src/routes/route.countries.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET_KEY,
		resave: false, // No resavea la sesión si no hay cambios
		saveUninitialized: true,
		cookie: { secure: false }, // Configura secure: true si estás usando HTTPS
	}),
);

app.set("view engine", "ejs"); // Configurar EJS como motor de plantillas
app.set("views", path.join(__dirname, "views")); // Configurar la carpeta donde estarán las vistas (por defecto es ./views)
app.use(express.urlencoded({ extended: true })); // Middleware para manejar datos enviados por formularios

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/intl-tel-input/build"))); // Servir los archivos estáticos (intl-tel-input)

app.use(routerSyncCart);

app.use(routerAuth);

app.use(routerLogIn);
app.use(routerSignUp);
app.use(routerLogOut);
app.use(routerForgotPassword);
app.use(routerResetPassword);
app.use(routerSetPassword);

app.use(routeProducts);
app.use(routerProcessOrder);

app.use(routerHomePage);
app.use(routerLoginPage);
app.use(routerEmptyCartPage);
app.use(routerOrderPage);

/* ------------------------------------------------------
    #MANEJO DE CENTRALIZADO  DE ERRORES
	--------------------------------------------------------*/
/* app.use((err, req, res, next) => {
	res.status(500).send({ error: err.message });
	}); */

app.use((req, res) => {
	res.sendFile(path.join(__dirname, "./public/404.html")); //Servimmos page 404.html
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
