import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class Helper {
	// hint from code mentor tutorials @OlawaleAladeusi

	//Hash Password Method
	static hashPassword(password) {
		return bcrypt.hashSync(password, 10);
	}

	//comparePassword
	static comparePassword(hashPassword, password, callback) {
		return bcrypt.compare(password, hashPassword, callback);
	}

	//isValidEmail helper method
	static isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	}

	//Generate Token
	static generateToken(id, email, password) {
		const token = jwt.sign({
			userId: id,
			email: email,
			password: password
		},
		process.env.SECRET_KEY, { expiresIn: "1d" }
		);
		return token;
	}
}


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
					status: "Error",
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
			status: "Error",
			message: "User not signed in, Please login"
		});
	}
});
// localStorage.setItem('token', token);
// localStorage.getItem('token');
