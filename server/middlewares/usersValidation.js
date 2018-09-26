import { db } from "../db";
import { Helper } from "../auth";

let i;
/**
 * Represents a Signup form validator
 * @param {object} req - The body request
 * @param {object} res - The body response
 * @param {object} next - function to execute next middleware
 */
export const signupValidation = (req, res, next) => {
	const { firstname, lastname, email, phone, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.status(400).json({
			status: "Error",
			message: "Password didn't match"
		});
	}
	if (password.length < 6) {
		return res.status(400).json({
			status: "Error",
			message: "Password length must be greater than 6"
		});
	}

	const checkArr = [firstname, lastname, email, phone, password];

	for (i = 0; i < checkArr.length; i++) {
		if (!checkArr[i]) {
			return res.status(400).json({
				status: "Error",
				message: "Required field empty"
			});
		}

		if (typeof checkArr[i] !== "string") {
			if (checkArr[i] === checkArr[3]) {
				/**skips phone number*/
				continue;
			}
			return res.status(400).json({
				status: "Error",
				message: `Invalid data type ${typeof checkArr[i]}. It should be a String data type`
			});
		}
	}

	if (firstname.length < 2 || lastname.length < 2) {
		return res.status(400).json({
			status: "Error",
			message: "A vaild name starts with at least 2 characters"
		});
	}

	if (!Helper.isValidEmail(email)) {
		return res.status(400).json({
			status: "Error",
			message: `The email ${email} is invalid`
		});
	}

	/**Namescheck*/


	if (!(Helper.isValidAlphabet(firstname.toString().toLowerCase()))) {
		return res.status(400).json({
			status: "Error",
			message: `Invalid input ${firstname}. All characters must be alphabets`
		});
	}



	if (!(Helper.isValidAlphabet(lastname.toString().toLowerCase()))) {
		return res.status(400).json({
			status: "Error",
			message: `Invalid input ${lastname}. All characters must be alphabets`
		});
	}


	for (i = 0; i < phone.length; i++) {
		if (phone.toString().charAt(i) === " ") {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${phone}. Spaces are not required`
			});
		}
	}


	if (!(Helper.isValidNumber(phone.toString()))) {
		return res.status(400).json({
			status: "Error",
			message: `Invalid input ${phone}. All characters must be numbers`
		});
	}



	if (phone.length !== 11) {
		return res.status(400).json({
			status: "Error",
			message: `Invalid phone number length ${phone}. It should be 11 digits`
		});
	}

	/**Move to next middleware function if username is defined */
	next();
};



/**
 * Represents a middleware validator to check if a particular user exists
 * @param {object} req - The body request
 * @param {object} res - The body response
 * @param {object} next - function to execute next middleware
 */
export const userExists = (req, res, next) => {
	const { email, phone } = req.body;


	db.any("SELECT * FROM users WHERE email = $1 OR phone = $2", [email, phone])
		.then(data => {
			if (data.length > 0) {
				return res.status(409).json({
					status: "Error",
					message: "User already exists"
				});
			} else{
				next();
			}
		});
};


/**
 * Represents a login form validator
 * @param {object} req - The body request
 * @param {object} res - The body response
 * @param {object} next - function to execute next middleware
 */
export const loginValidation = (req, res, next) => {
	const {email, password} = req.body;

	if (!email || !password) {
		return res.status(400).json({
			status: "Error",
			message: "email or password is not defined"
		});
	}
	if (typeof email !== "string" || typeof password !== "string") {
		return res.status(400).json({
			status: "Error",
			message: "Email and Passord must be a string datatype"
		});
	}
	next();
};


