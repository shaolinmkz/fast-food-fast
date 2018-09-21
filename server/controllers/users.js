import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Users {

	fetchUsers (req, res) {
		db.any("SELECT * FROM users")
			.then(users => {
				return res.status(200)
					.json({
						status: 200,
						users
					});
			})
			.catch(error => res.status(500)
				.json({
					status: 500,
					error
				}));
	}

	createNewUsers (req, res) {

		const {
			firstname,
			lastname,
			email,
			password } = req.body;

		let { phone } = req.body;

		const fullname = `${lastname}, ${firstname}`;
		phone = phone.toString();
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


	loginUser(req, res) {
		// const {id, email} = req.decoded;
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
					return res.status(400).json({ status: 400, message: "User doesn't exit, create user!" });
				}
			})
			.catch(error => res.status(500).json({ status: 500, error }));
	}



	logoutUser(req, res) {

		const { email } = req.body;

		db.any("UPDATE users SET logged_in = false WHERE email = $1 RETURNING *", [email])
			.then(user => {
				if (user.length > 0) {
					const token = jwt.sign({
						id: user[0].id,
						email
					}, process.env.SECRET_KEY, { expiresIn: "1s" });

					return res.status(200).json({
						status: "Success",
						message: "User Logged out Successfully",
						logged_in: user[0].logged_in,
						tokenMessage: "Token Expired",
						token
					});
				} else {
					return res.status(400).json({
						status: 400,
						message: "Invalid User!" });
				}
			})
			.catch(error => res.status(500).json({ status: 500, error }));
	}

}
