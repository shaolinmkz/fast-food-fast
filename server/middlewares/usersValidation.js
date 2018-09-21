import { db } from "../db";
import { Helper } from "../auth";
import { LoopHelper } from "../Helper";

const loopHelper = new LoopHelper();

let i;

export const signupValidation = (req, res, next) => {
	const { firstname, lastname, email, phone, password, confirmPassword  } = req.body;

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
				//skips phone number
				continue;
			}
			return res.status(400).json({
				status: "Error",
				message: `Invalid data type ${typeof checkArr[i]}. It should be a String data type`
			});
		}
	}

	// for (i = 0; i < email.length; i++){
	// 	if (email[i] !== " ") {
	// 		return res.status(400).json({
	// 			status: "Error",
	// 			message: "There should be no spaces"
	// 		});
	// 	}
	// }

	if (!Helper.isValidEmail(email)) {
		return res.status(400).json({
			status: "Error",
			message: `The email ${email} is invalid`
		});
	}

	// if (typeof phone !== "string" && typeof phone !== "number"){
	// 	return res.status(400).json({
	// 		status: "Error",
	// 		message: `Invalid data type ${typeof phone}. It should be a string data type`
	// 	});
	// }

	// loopHelper.errorLooper(firstname, "string", "Invalid firstname character, must be a string");
	// for (i = 0; i < firstname.length; i++) {
	//   if (typeof firstname[i] !== "string") {
	//     return res.status(400).json({
	//       status: "Error",
	//       message: "Invalid firstname character, must be a string"
	//     });
	//   }
	// }

	if (firstname && lastname && email && phone && password) {
		db.any("SELECT * FROM users WHERE email = $1 OR phone = $2", [email, phone])
			.then((data) => {
				if (data.length > 0) {
					return res.status(409).json({
						status: "Error",
						message: "User already exists"
					});
				}
				next();
			})
			.catch( (err) => {
				return res.status(400).json({
					status: "Error",
					message: err
				});
			});
	}
};

export const loginValidation = (req, res, next) => {
	const {email, password} = req.body;

	if (!email || !password) {
		return res.status(400).json({
			status: "Error",
			message: "email or password is not defined"
		});
	}
	if (typeof email !== "string" && typeof password !== "string") {
		return res.status(400).json({
			status: "Error",
			message: "Email and Passord must be a string datatype"
		});
	}
	next();
};

// export const setLoggedInFalse = (req, res, next) => {

// 	const { email } = req.body;

// 	db.any("UPDATE users SET logged_in = false WHERE email = $1 RETURNING *", [email])
// 		.then(user => {
// 			if (user.length > 0) {

// 				return next();

// 			} else {
// 				return res.status(400).json({
// 					status: 400,
// 					message: "Invalid User!"
// 				});
// 			}
// 		})
// 		.catch(error => res.status(500).json({
// 			status: "Error",
// 			error
// 		}));
// };