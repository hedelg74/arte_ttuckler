import "dotenv/config";
import jwt from "jsonwebtoken";

const controllerAuth = (req, res) => {
	const token = req.cookies.token;

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
		if (err) {
			req.session.returnTo = req.originalUrl;
			console.log("error, token no valido");
			return res.status(401).json({ success: false, message: "token no valido." });
		}

		req.user = decoded;
		req.session.userId = req.user.id;
		console.log(req.session.userId);

		return res.status(200).json({ success: true, message: "token valido.", username: req.user.username });
	});
};
export default controllerAuth;
