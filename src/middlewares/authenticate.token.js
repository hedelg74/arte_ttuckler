// authMiddleware.js
import "dotenv/config";
import jwt from "jsonwebtoken";

// Middleware para verificar el token
function authenticateToken(req, res, next) {
	if (req.path.includes("/profile", "/order")) {
		const token = req.cookies.token; // Asumimos que cookieParser ya fue usado

		if (!token) {
			req.session.returnTo = req.originalUrl;
			return res.redirect("/login");
			//return res.sendStatus(401); // Si no hay token, retornar 401
		}
		// Verifica el token
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				req.session.returnTo = req.originalUrl;
				console.log("error de token");
				return res.redirect("/login"); // Redirigir al login si el token ha expirado o erroneo
			}

			// Si el token es válido, almacena la información del usuario en la solicitud
			req.user = decoded;
		});
	}
	next(); // Continúa al siguiente middleware
}

export default authenticateToken;
