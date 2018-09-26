import { db } from "../db";

/**
 * Represents a Signup form validator
 * @param {object} req - The body request
 * @param {object} res - The body response
 * @param {object} next - function to execute next middleware
 */
export const adminSignupValidation = (req, res, next) => {
	const { username, email, phone } = req.body;

	if (!username) {
		return res.status(400).json({
			status: "Error",
			message: "Required field empty"
		});
	}

	if (typeof username !== "string") {
		return res.status(400).json({
			status: "Error",
			message: `Invalid data type ${typeof(username)}. It should be a String data type`
		});
	}

	if (username.length < 4) {
		return res.status(400).json({
			status: "Error",
			message: "A username must be 4 characters and above",
			example: "Tony is acceptable NOT Ton OR Ony"
		});
	}

	if (username && email && phone) {
		db.any("SELECT * FROM admins WHERE username = $1 OR email = $2 OR phone = $3", [username, email, phone])
			.then((admin) => {
				if (admin.length > 0) {
					return res.status(409).json({
						status: "Error",
						message: "Admin already exists"
					});
				}
				next();
			})
			.catch((err) => {
				return res.status(400).json({
					status: "Error",
					message: err
				});
			});
	}

};

/**
 * Represents a login form validator
 * @param {object} req - The body request
 * @param {object} res - The body response
 * @param {object} next - function to execute next middleware
 */
export const adminLoginValidation = (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({
			status: "Error",
			message: "username or password is not defined"
		});
	}
	if (typeof username !== "string" || typeof password !== "string") {
		return res.status(400).json({
			status: "Error",
			message: "username and Passord must be a string datatype"
		});
	}
	return next();
};

