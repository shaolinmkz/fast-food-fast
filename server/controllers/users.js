import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OrderedMeals, Billings } from "../middlewares";
import { foodsDBfunc, drinksDBfunc } from "../middlewares/logics";

const orderedMeals = new OrderedMeals();
const billing = new Billings();

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
			.catch(() => res.status(404)
				.json({
					status: "Error",
					message: "users not found"
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
				if (user[0].logged_in.toString() === "true") {
					return res.status(400).json({
						status: "Error",
						message: "User is already logged in"
					});
				}
				if (user.length > 0) {
					bcrypt.compare(password, user[0].password, (error, result) => {
						if (error) {
							return res.status(400).json({
								status: "Error",
								message: "invalid user!"
							});
						}

						if (!result) {
							return res.status(400).json({
								status: "Error",
								message: "wrong password, please check and try again"
							});
						}
						else {
							db.any("UPDATE users SET logged_in = true WHERE email = $1 RETURNING *", [email])
								.then((user2) => {
									const token = jwt.sign({
										id: user2[0].id,
										email: user2[0].email,
										fullname: user2[0].fullname
									}, process.env.SECRET_KEY, { expiresIn: "1d" });
									if (token) {
										return res.status(200).json({
											status: "Success",
											message: `User logged in successfully, Welcome ${user2[0].fullname}`,
											mobile_number: "+234" + Number(user2[0].phone),
											logged_in: user2[0].logged_in,
											token: token
										});
									}
								});
						}
					});
				} else {
					return res.status(400).json({
						status: "Error",
						message: "User doesn't exist, create user!"
					});
				}
			})
			.catch (err => res.status(400).json({
				status: "Error",
				message: "User doesn't exist, create user!",
				err
			}));
	}



	/**
   * Method to logout users
   * @param { object } req - body request
   * @param { object } res - body response
   */
	logoutUser(req, res) {

		const { email } = req.userInfo;

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




	/**
   * @description Represents a get all menu function
   * @param { object } req - body request
   * @param { object } res - body response
   */
	getAllMenu(req, res) {
		let foods, drinks;
		db.any("SELECT * FROM foods")
			.then(data1 => {
				foods = data1;
				if (foods[0]) {
					db.any("SELECT * FROM drinks")
						.then(data2 => {
							drinks = data2;
							return res.status(200).json({
								status: "Success",
								message: "All menus received successfully",
								solid_meals: foods,
								liquid_meals: drinks
							});
						}).catch(err => {
							res.status(500).json({
								status: "Error",
								err
							});
						});
				} else {
					return res.status(404).json({
						status: "Error",
						message: "Menu not found"
					});
				}
			})
			.catch(error => res.status(500)
				.json({
					status: "Error",
					error
				}));
	}



	/**
   * @description Method that places an order
   * @param { object } req - body request
   * @param { object } res - body response
   */
	placeOrder(req, res) {
		// foodsDBfunc();
		// drinksDBfunc();
		const { id }  = req.userInfo;
		console.log("starting place osder function", id);
		let { address, lga, state, foods,
			foodsQuantity, drinks, drinksQuantity } = req.body;

		foods = orderedMeals.displayFoods(foods);
		drinks = orderedMeals.displayDrinks(drinks);
		console.log("before db.tx", foods, drinks, address, lga, state);

		db.any("UPDATE users SET address = $1 WHERE id = $2 RETURNING *", [address, id])
			.then(() => {
				db.any("UPDATE users SET lga = $1 WHERE id = $2 RETURNING *", [lga, id])
					.then(() => {
						db.any("UPDATE users SET state = $1 WHERE id = $2 RETURNING *", [state, id])
							.then((userData) => {
								const userInfo = userData[0];
								// console.log("user information ----------------------->",userInfo);
								let subtotal = billing.subtotal(drinks, foods, foodsQuantity, drinksQuantity);
								console.log("1");
								let discount = billing.discount(drinks, foods, foodsQuantity, drinksQuantity);
								console.log(2);
								let delivery = billing.delivery(drinks, foods);
								console.log(3);
								let total = billing.total(drinks, foods, foodsQuantity, drinksQuantity);
								console.log(4);
								let status = "new"; /**Order status could be: new, procesing, cancelled, or completed*/
								console.log(5);
								foods = foods.join(","); drinks = drinks.join(",");
								console.log(foods,"_________________________", drinks);
								db.any("INSERT INTO orders (food_items, drink_items, subtotal, delivery, discount, total, status, user_id)" +
                  "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [foods, drinks, subtotal, delivery, discount, total, status, id])
									.then(() => {
										console.log(6);
										db.any("SELECT * FROM orders WHERE user_id = $1", [id])
											.then(orderData => {
												const orderDetails = orderData[(orderData.length) - 1];

												return res.status(201).json({
													status: "Success",
													message: "Your order has been placed",
													order_id: orderDetails.id,
													shippingdetails: userInfo,
													items: {
														foods: orderDetails.food_items || [],
														drinks: orderDetails.drink_items || []
													},
													bill: {
														subtotal: `${orderDetails.subtotal}`,
														discount: `${orderDetails.discount}`,
														delivery: `${orderDetails.delivery}`,
														total: `${orderDetails.total}`
													},
													order_status: orderDetails.status,
													ordered_datetime: orderDetails.created_date
												});

											})
											.catch(err => err);
									})
									.catch(err => err);
							})
							.catch(err => err);
					})
					.catch(err => err);
			})
			.catch(err => err);

	}



	/**
   * Represents a Get user order history
   * @param { object } req - body request
   * @param { object } res - body response
   */
	fetchUsersOrderHistory(req, res) {
		const { id } = req.params || req.userInfo;
		db.any("SELECT * FROM orders WHERE user_id= $1", [id])
			.then(history => {
				if (history.length - 1 < 0) {
					return res.status(404).json({
						status: "Error",
						message: "History not found"
					});
				}
				return res.status(200)
					.json({
						status: "Success",
						message: "All order history received successfully",
						history
					});
			})
			.catch(() => res.status(404)
				.json({
					status: "Error",
					message: "History not found"
				}));
	}





}



