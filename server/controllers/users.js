import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @class \{{{object}}\} {{Users}}{{Contains methods users session}}
 */
export class Users {

	/**
   * Represents a get all user function
   * @param { object } req - body request
   * @param { object } res - body response
   */
	fetchUsers (req, res) {
		db.any("SELECT * FROM users")
			.then(users => {
				return res.status(200)
					.json({
						status: "Success",
						message: "All users received successfully",
						users
					});
			})
			.catch(error => res.status(500)
				.json({
					status: "Error",
					error
				}));
	}

	/**
   * Represents signup user
   * @param { object } req - request body
   * @param { object } res - response body
   */
	createNewUsers (req, res) {
		const {
			firstname,
			lastname,
			email,
			password } = req.body;

		let { phone } = req.body;

		const fullname = `${lastname.trim()}, ${firstname.trim()}`;
		phone = phone.toString().trim();
		const hash = bcrypt.hashSync(password, 10);

		db.none("INSERT INTO users(fullname, email, phone, password, logged_in)" +
    "VALUES ($1, $2, $3, $4, $5)", [fullname, email, phone, hash, true])
			.then(() => {
				db.any("SELECT * FROM users WHERE email = $1", [email])
					.then(data => {
						const user = data[0];
						const token = jwt.sign({
							id: user.id,
							email: email
						}, process.env.SECRET_KEY, {expiresIn: "1d"});

						return res.status(201).json({
							status: "Success",
							message: `User created Successfully, Welcome ${user.fullname} to f-cube`,
							token,
							fullname: user.fullname,
							email: user.email,
							mobile_number: "+234" + Number(user.phone),
							logged_in: `${user.logged_in}`
						});
					}).catch((err) => {
						return res.status(500).json({
							status: "Error",
							message: err
						});
					});
			})
			.catch((err) => {
				return res.status(500).json({
					status: "Error",
					message: err
				});
			});
	}

	/**
   * Method to login users
   * @param { object } req - body request
   * @param { object } res - body response
   */
	loginUser(req, res) {

		const { email, password } = req.body;

		db.any("SELECT * FROM users WHERE email = $1", [email])
			.then(user => {
				if (user.length > 0) {
					bcrypt.compare(password, user[0].password, (error, result) => {
						if (error) {
							return res.status(400).json({ status: "Error", message: "invalid user!" });
						}
						if (!result){
							return res.status(400).json({ status: "Error", message: "Invalid Password!" });
						}
						if (result) {
							const token = jwt.sign({
								id: user[0].id,
								email
							}, process.env.SECRET_KEY, { expiresIn: "1d" });

							return res.status(200).json({
								status: "Success",
								message: `User Logged in Successfully, Welcome ${user[0].fullname}`,
								token,
								fullname: user[0].fullname,
								mobile_number: "+234" + Number( user[0].phone),
								logged_in: `${user[0].logged_in}`
							});
						}
					});
				} else {
					return res.status(400).json({
						status: "Error",
						message: "User doesn't exit, create user!"
					});
				}
			})
			.catch(error => res.status(500).json({
				status: "Error",
				error
			}));
	}


	/**
   * Method to logout users
   * @param { object } req - body request
   * @param { object } res - body response
   */
	logoutUser(req, res) {

		const { email } = req.body;

		db.any("UPDATE users SET logged_in = false WHERE email = $1 RETURNING *", [email])
			.then(user => {
				if (user.length > 0) {
					const token = jwt.sign({
						id: user[0].id,
						email
					}, process.env.SECRET_KEY, { expiresIn: "1s" });
					if (token) {
						return res.status(200).json({
							status: "Success",
							message: "User Logged out Successfully",
							logged_in: user[0].logged_in,
							tokenMessage: "Token Expired",
						});
					}
				} else {
					return res.status(400).json({
						status: "Error",
						message: "Invalid User!" });
				}
			})
			.catch(error => res.status(500).json({
				status: "Error",
				error
			}));
	}
}
