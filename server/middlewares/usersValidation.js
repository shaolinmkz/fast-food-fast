import { db } from "../db";

let i;

export const usersInputValidation = (req, res, next) => {
	const { firstname, lastname, email, phone, password  } = req.body;

	const checkArr = [firstname, lastname, email, phone, password];

	for (i = 0; i < checkArr.length; i++) {
		if (!checkArr[i]) {
			return res.status(400).json({
				status: "Error",
				message: "Required field empty"
			});
		}
		if (typeof checkArr[i] !== "string") {
			if (checkArr[i] === checkArr[2]) {
				continue;
			}
			return res.status(400).json({
				status: "Error",
				message: `Invalid character entered => ${checkArr[i]}`
			});
		}
	}

	if (firstname && lastname && email && phone && password) {
		db.any("SELECT * FROM users WHERE email = $1 OR phone = $2", [email, phone])
			.then((data) => {
				if (data) {
					res.status(409).json({
						message: "user already exists"
					});
				} else {
					return next();
				}
			})
			.catch(function (err) {
				return console.log("Error:", err);
			})
			.finally(db.$pool.end);
	}
};