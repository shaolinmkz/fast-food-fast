import jwt from "jsonwebtoken";

// export default (req, res, next) => {
// 	try {
// 		const token = req.headers["x-access-token"] || req.body.token;
// 		const decoded = jwt.verify(token, process.env.JWT_KEY);
// 		req.userData = decoded;
// 		next();
// 	}
// 	catch (error) {
// 		return res.status(401).json({
// 			message: "User Not logged in!"
// 		});
// 	}
// };

/**
 * JWT- JSON WEB TOKEN AUTHENTICATION (Asynchronous call)
 * @param {object} req - body request
 * @param {object} res - response
 * @param {function} next - calls next function
 */
export const auth = ((req, res, next) => {
	// check header or url parameters or post parameters for token
	let token = req.body.token || req.query.token || req.headers["x-access-token"];
	if (token) {
		//Decode the token
		jwt.verify(token, process.env.SECRET_KEY, (err, decod) => {
			if (err) {
				res.status(403).json({
					message: "No Token, access denied!"
				});
			}
			else {
				//If decoded then call next() so that respective route is called.
				req.decoded = decod;
				next();
			}
		});
	}
	else {
		res.status(401).json({
			status: "User Error",
			message: "Not logged in"
		});
	}
});