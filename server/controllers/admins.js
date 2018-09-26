import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.load();


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
			.catch(() => res.status(404)
				.json({
					status: "Error",
					message: "Admins not found"
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

		if (adminToken !== process.env.ADMIN_TOKEN) {
			return res.status(400).json({
				status: "Error",
				message: "Invalid token, check and try again"
			});
		}
		const fullname = `${lastname.trim()} ${firstname.trim()}`;
		phone = phone.toString().trim();
		const hash = bcrypt.hashSync(password, 10);
		const bool = "true";

		db.any("INSERT INTO admins(username, fullname, email, phone, password, logged_in)" +
      "VALUES ($1, $2, $3, $4, $5, $6)", [username, fullname, email, phone, hash, bool])
			.then(() => {
				db.any("SELECT * FROM admins WHERE username = $1", [username])
					.then(data => {
						const admin = data[0];
						const token = jwt.sign({
							id: admin.id,
							email: admin.email,
							username: admin.username,
							phone: admin.phone
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

		const { password } = req.body;

		let { username } = req.body;

		username = username.trim();

		db.any("SELECT * FROM admins WHERE username = $1", [username])
			.then(admin => {
				if (admin.length > 0) {
					bcrypt.compare(password, admin[0].password, (error, result) =>{

						if (admin[0].logged_in.toString() === "true") {
							return res.status(400).json({
								status: "Error",
								message: "Admin is logged in already!"
							});
						}

						if (error) {
							return res.status(400).json({
								status: "Error",
								message: "invalid admin!"
							});
						}

						if (!result) {
							return res.status(400).json({
								status: "Error",
								message: "wrong password, please check and try again"
							});
						}
						else {
							db.any("UPDATE admins SET logged_in = true WHERE username = $1 RETURNING *", [username])
								.then((admin2) => {
									const token = jwt.sign({
										id: admin2[0].id,
										email: admin2[0].email,
										username: admin2[0].username,
										phone: admin2[0].phone
									}, process.env.ADMIN_ONLY, {expiresIn: "1d"});
									if (token) {
										return res.status(200).json({
											status: "Success",
											message: `Admin ${admin2[0].username} Logged in successfully`,
											logged_in: admin2[0].logged_in,
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
				} else{
					return res.status(404).json({
						status: "Error",
						message: "Admin doesn't exist, create admin!"
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

		let { username } = req.adminInfo;


		db.any("UPDATE admins SET logged_in = false WHERE username = $1 RETURNING *", [username])
			.then(admin => {
				if (admin.length > 0) {
					const token = jwt.sign({
						id: admin[0].id,
						username: admin[0].username,
						email: admin[0].email,
						phone: admin[0].phone
					}, process.env.ADMIN_ONLY, { expiresIn: "5s" });
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
			.catch( res.status(500).json({
				status: "Error",
				message: "You are not signed in"
			}));
	}



	/**
   * Represents Add Foods by admins
   * @param { object } req - request body
   * @param { object } res - response body
   */
	addFoods(req, res) {

		let { name, price } = req.body;

		name = name.toString().trim(); price = price.toString().trim();

		db.none("INSERT INTO foods(name, price) VALUES ($1, $2)", [name, price])
			.then(() => {
				db.any("SELECT * FROM foods WHERE name = $1", [name])
					.then(data => {
						const foods = data[0];

						return res.status(201).json({
							status: "Success",
							message: "Food created Successfully",
							product_name: foods.name,
							price: foods.price,
						});
					}).catch((err) => {
						return res.status(500).json({
							status: "Error",
							message: err
						});
					});
			})
			.catch(() => {
				return res.status(409).json({
					status: "Error",
					message: "Food already exists, choose a different name"
				});
			});
	}

	/**
   * Represents Add Drinks by admins
   * @param { object } req - request body
   * @param { object } res - response body
   */
	addDrinks(req, res) {

		let { name, price } = req.body;

		name = name.toString().trim(); price = price.toString().trim();

		db.none("INSERT INTO drinks(name, price) VALUES ($1, $2)", [name, price])
			.then(() => {
				db.any("SELECT * FROM drinks WHERE name = $1", [name])
					.then(data => {
						const drinks = data[0];

						return res.status(201).json({
							status: "Success",
							message: "Drink created Successfully",
							product_name: drinks.name,
							price: drinks.price,
						});
					}).catch((err) => {
						return res.status(500).json({
							status: "Error",
							message: err
						});
					});
			})
			.catch(() => {
				return res.status(409).json({
					status: "Error",
					message: "Drink already exists, choose a different name"
				});
			});
	}



	/**
* Represents Get a specific order
* @param { object } req - body request
* @param { object } res - body response
*/
	getASpecificOrder(req, res) {
		let { id } = req.params;
		id = parseInt(id, 10);
		console.log(id);
		db.any("SELECT * FROM orders WHERE id= $1", [id])
			.then(order => {
				if (order.length - 1 < 0) {
					return res.status(404).json({
						status: "Error",
						message: "order not found"
					});
				}
				return res.status(200)
					.json({
						status: "Success",
						message: "All orders received successfully",
						order
					});
			})
			.catch(() => res.status(404)
				.json({
					status: "Error",
					message: "Orders not found"
				}));
	}



	/**
   * Represents a Get all order
   * @param { object } req - body request
   * @param { object } res - body response
   */
	fetchAllOrders(req, res) {
		db.any("SELECT * FROM orders")
			.then(allOrders => {
				if (allOrders.length - 1 < 0) {
					return res.status(404).json({
						status: "Error",
						message: "orders not found"
					});
				}
				return res.status(200)
					.json({
						status: "Success",
						message: "All orders received successfully",
						allOrders
					});
			})
			.catch(() => res.status(404)
				.json({
					status: "Error",
					message: "Orders not found"
				}));
	}





	/**
   * @description Update order status
   * @param { object } req - body request
   * @param { object } res - body response
   */
	updateOrderStatus(req, res) {
		const { status } = req.body;
		let { id } = req.params;
		id = parseInt(id, 10);

		db.one("UPDATE orders SET status = $1 WHERE id = $2 RETURNING *", [status, id])
			.then((statusData) => {
				if (statusData.length < 0) {
					return res.status(404).json({
						status: "Error",
						message: "Order not found"
					});
				}
				return res.status(200).json({
					status: "Success",
					message: "Order status updated",
					updated_order: statusData[0]
				});
			})
			.catch(error => res.status(500).json({
				status: "Error",
				error
			}));
	}

}

