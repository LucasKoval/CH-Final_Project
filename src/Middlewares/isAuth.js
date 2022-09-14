import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = (req, res, next) => {
	const headerAuthorization = req.headers["authorization"] || req.headers["Authorization"] || "";

	if (!headerAuthorization) {
		return res.status(401).json({
			message: "Debe enviar un Authorization Bearer token en los headers.",
			code: "Authorization_token_required",
		});
	}

	const token = headerAuthorization.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			message: "Token requerido",
			code: "token_required",
			status: 401,
		});
	}

	try {
		req.user = jwt.verify(token, process.env.JWT_SECRET);
		console.log("REQ USER >>>>>>>>", req.user);
	} catch (error) {
		return res.status(403).json({
			message: "No autorizado. Token inválido.",
			code: "not_authorized",
			status: 403,
		});
	}

	next();
};
