import { db } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OrderedMeals, Billings } from "../middlewares";

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
				if (users.length < 0) {
					return res.status(404).json({
						status: "Error",
						message: "users not found"
					});
				}
				return res.status(200)
					.json({
						status: "Success",
						message: "All users received successfully",
						users
					});
			});
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
							user_id: user.id,
							fullname: user.fullname,
							email: user.email,
							mobile_number: "+234" + Number(user.phone),
							logged_in: `${user.logged_in}`
						});
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
						if (user[0].logged_in.toString() === "true") {
							return res.status(400).json({
								status: "Error",
								message: "User is already logged in"
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

									return res.status(200).json({
										status: "Success",
										message: `User logged in successfully, Welcome ${user2[0].fullname}`,
										mobile_number: "+234" + Number(user2[0].phone),
										logged_in: user2[0].logged_in,
										token: token
									});
								});
						}
					});
				} else {
					return res.status(400).json({
						status: "Error",
						message: "User doesn't exist, create user!"
					});
				}
			});
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
					jwt.sign({
						id: user[0].id,
						email
					}, process.env.SECRET_KEY, { expiresIn: "0s" });
					return res.status(200).json({
						status: "Success",
						message: "User Logged out Successfully",
						logged_in: user[0].logged_in,
						tokenMessage: "Token Expired",
					});
				} else {
					return res.status(400).json({
						status: "Error",
						message: "Invalid User!" });
				}
			});
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
				if (data1.length > 0) {
					db.any("SELECT * FROM drinks")
						.then(data2 => {
							drinks = data2;
							return res.status(200).json({
								status: "Success",
								message: "All menus received successfully",
								solid_meals: foods,
								liquid_meals: drinks
							});
						});
				} else {
					return res.status(404).json({
						status: "Error",
						message: "Menu not found"
					});
				}
			});
	}



	/**
   * @description Method that places an order
   * @param { object } req - body request
   * @param { object } res - body response
   */
	placeOrder(req, res) {

		const { id }  = req.userInfo;

		let { address, lga, state, foods,
			foodsQuantity, drinks, drinksQuantity } = req.body;

		foods = orderedMeals.displayFoods(foods);
		drinks = orderedMeals.displayDrinks(drinks);
		db.any("SELECT * FROM users where id = $1", [id])
			.then(data => {
				if (data.length > 0) {
					db.any("UPDATE users SET address = $1 WHERE id = $2 RETURNING *", [address, id])
						.then(() => {
							db.any("UPDATE users SET lga = $1 WHERE id = $2 RETURNING *", [lga, id])
								.then(() => {
									db.any("UPDATE users SET state = $1 WHERE id = $2 RETURNING *", [state, id])
										.then((userData) => {
											const userInfo = userData[0];

											let subtotal = billing.subtotal(drinks, foods, foodsQuantity, drinksQuantity);
											let discount = billing.discount(drinks, foods, foodsQuantity, drinksQuantity);
											let delivery = billing.delivery(drinks, foods);
											let total = billing.total(drinks, foods, foodsQuantity, drinksQuantity);
											let status = "NEW"; /**Order status could be: new, procesing, cancelled, or completed*/

											foods = foods.join(","); drinks = drinks.join(",");

											db.any("INSERT INTO orders (food_items, drink_items, subtotal, delivery, discount, total, status, user_id)" +
                  "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [foods, drinks, subtotal, delivery, discount, total, status, id])
												.then(() => {

													db.any("SELECT * FROM orders WHERE user_id = $1", [id])
														.then(orderData => {
															const orderDetails = orderData[(orderData.length) - 1];

															return res.status(201).json({
																status: "Success",
																message: "Your order has been placed",
																order_id: orderDetails.id,
																shippingdetails: {
																	name: userInfo.fullname,
																	email: userInfo.email,
																	phone_number: userInfo.phone,
																	address: `${userInfo.address}, ${userInfo.lga}, ${userInfo.state}`,
																},
																items: {
																	foods: orderDetails.food_items,
																	drinks: orderDetails.drink_items
																},
																bill: {
																	subtotal: `₦${orderDetails.subtotal}`,
																	discount: `₦${orderDetails.discount}`,
																	delivery: `₦${orderDetails.delivery}`,
																	total: `₦${orderDetails.total}`
																},
																order_status: orderDetails.status,
																ordered_datetime: orderDetails.created_date
															});
														});
												});
										});
								});
						});
				} else {
					return res.status(400).json({
						status: "Error",
						message: "user doesn't exist or is not logged in"
					});
				}
			});

	}



	/**
   * Represents a Get user order history
   * @param { object } req - body request
   * @param { object } res - body response
   */
	fetchUsersOrderHistory(req, res) {
		const { id } = req.params;

		if (Number(id) !== Number(req.userInfo.id)) {
			return res.status(400).json({
				status: "Error",
				message: "Invalid user id"
			});
		} else {
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
				});
		}
	}


}



