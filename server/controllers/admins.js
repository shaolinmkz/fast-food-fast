import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class Admins{

	/**
   * Represents a get all admins function
   * @param { object } req - body request
   * @param { object } res - body response
   */
	fetchAdmins(req, res) {
		db.any("SELECT * FROM admins")
			.then(admins => {
				return res.status(200)
					.json({
						status: "Success",
						message: "All admins received successfully",
						admins
					});
			})
			.catch(error => res.status(500)
				.json({
					status: "Error",
					error
				}));
	}



	/**
   * Represents signup admins
   * @param { object } req - request body
   * @param { object } res - response body
   */
	createNewAdmins(req, res) {
		const {
			username,
			firstname,
			lastname,
			email,
			adminToken,
			password } = req.body;

		let { phone } = req.body;

		if (adminToken === process.env.ADMIN_TOKEN) {
			return res.status(400).json({
				status: "Error",
				message: "Invalid token, check and try again"
			});
		}

		const fullname = `${lastname.trim()}, ${firstname.trim()}`;
		phone = phone.toString().trim();
		const hash = bcrypt.hashSync(password, 10);

		db.none("INSERT INTO admins(username, fullname, email, phone, password, logged_in)" +
      "VALUES ($1, $2, $3, $4, $5, $6)", [username, fullname, email, phone, hash, true])
			.then(() => {
				db.any("SELECT * FROM admins WHERE email = $1", [username])
					.then(data => {
						const admin = data[0];
						const token = jwt.sign({
							id: admin.id,
							email: email,
							username: username,
							phone: phone
						}, process.env.ADMIN_ONLY, { expiresIn: "1d" });

						return res.status(201).json({
							status: "Success",
							message: `Admin created Successfully, Welcome Admin ${admin.username}`,
							token,
							username: admin.username,
							fullname: admin.fullname,
							email: admin.email,
							mobile_number: "+234" + Number(admin.phone),
							logged_in: `${admin.logged_in}`
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
   * Method to login admin
   * @param { object } req - body request
   * @param { object } res - body response
   */
	loginAdmin(req, res) {

		const { username, password } = req.body;

		db.any("SELECT * FROM admins WHERE username = $1", [username])
			.then((admin) => {
				if (admin.length > 0) {
					bcrypt.compare(password, admin[0].password, (error, result) =>{
						if (error) {
							return res.status(400).json({
								status: "Error",
								message: "invalid admin!"
							});
						}
						if (!result) {
							return res.status(400).json({
								status: "Error",
								message: "Invalid admin"
							});
						}
						if (result) {
							db.any("UPDATE admins SET logged_in = true WHERE username = $1 RETURNING *", [username])
								.then((admin2) => {
									const token = jwt.sign({
										id: admin2[0].id,
										email: admin2[0].email,
										username: admin2[0].username
									}, process.env.ADMIN_ONLY, {expiresIn: "1d"});
									if (token) {
										return res.status(200).json({
											status: "Success",
											message: `Admin ${admin2[0].username} Logged in successfully`,
											logged_in: admin2[0].logg_in,
											token: token
										});
									}
								})
								.catch(err => res.status(500).json({
									status: "Error",
									err
								}));
						}
					});
				}
			})
			.catch(err => res.status(500).json({
				status: "Error",
				err
			}));
	}


	/**
   * Method to logout admin
   * @param { object } req - body request
   * @param { object } res - body response
   */
	logoutAdmin(req, res) {

		const { username } = req.body;

		db.any("UPDATE admins SET logged_in = false WHERE username = $1 RETURNING *", [username])
			.then(admin => {
				if (admin.length > 0) {
					const token = jwt.sign({
						id: admin[0].id,
						username: admin[0].username
					}, process.env.SECRET_KEY, { expiresIn: "1s" });
					if (token) {
						return res.status(200).json({
							status: "Success",
							message: "Admin Logged out Successfully",
							logged_in: admin[0].logged_in,
							tokenMessage: "Token Expired",
						});
					}
				} else {
					return res.status(400).json({
						status: "Error",
						message: "Invalid admin!"
					});
				}
			})
			.catch(error => res.status(500).json({
				status: "Error",
				error
			}));
	}


}



