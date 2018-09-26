import { orders } from "../dummyDB";
import {OrderedMeals} from "../middlewares";
let i = 0;

/**
 * Validates users input for strings, object, Array or numbers data type and handles errors
 * @function { object } { orderValidation }
 * @param  { object } req - Contains the body of the request.
 * @param  { string } { firstname, lastname, email, address, lga, state, phone, addressNo, foods, drinks }
 * @param  { number } { phone, addressNo, id } - id is generated automatically
 * @param  { array }  { foods, drinks }
 * @return { object } res - Contains the returned response.
 * @function  { next } - Proceeds to the next method on the route
 */
export const orderValidation = (req, res, next) => {
	const {address, lga, state } = req.body;
	let { foodsQuantity, drinksQuantity, foods, drinks } = req.body;

	const reqArray = [address, lga, state, foods, drinks, foodsQuantity, drinksQuantity];

	for (i in reqArray) {
		if (!reqArray[i]) {
			return res.status(400).send({
				status: "Error",
				message: "One or more input fields are empty or has invalid input",
			});
		}
	}

	const strings = [address, lga, state];

	for(i in strings) {
		if (typeof strings[i] !== "string") {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${strings[i]}. Should be a string data type`,
			});
		}
	}


	const quantityNum = [drinksQuantity, foodsQuantity];
	for (i in quantityNum) {
		if (!Array.isArray(quantityNum[i])) {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input data type ${quantityNum[i]}. Should be an Array`,
			});
		}
	}

	let k;
	for (i = 0; i < quantityNum.length; i++) {
		for (k = 0; k < quantityNum[i].length; k++) {
			if (typeof quantityNum[i][k] !== "number") {
				return res.status(400).json({
					status: "Error",
					message: `Invalid input [${quantityNum[i]}] ==> ${quantityNum[i][k]}. Should be a number data type`,
				});
			}
		}
	}


	const objStr = [foods, drinks];
	for (i = 0; i < objStr.length; i++) {
		if (typeof objStr[i] !== "string" && !Array.isArray(objStr[i])) {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${objStr[i]}. Should be an Array object or a string data type`,
			});
		}
	}

	const convertToArray = new OrderedMeals();

	const newDrinks = convertToArray.displayDrinks(drinks);
	const newFoods = convertToArray.displayFoods(foods);

	const quantity = [foodsQuantity, newFoods, drinksQuantity, newDrinks];
	if ((quantity[0].length !== quantity[1].length) || (quantity[2].length !== quantity[3].length) ) {
		return res.status(400).json({
			status: "Error",
			massage: "Quantity or Meal item isn't specified, Please specify quantity and meal item"
		});
	}

	return next();
};


export const useridAddressNoCheck = (req, res, next) => {
	const { userId, addressNo } = req.body;

	const num = [userId, addressNo];
	for (i in num) {
		if (typeof num[i] !== "number") {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${i} ==> ${num[i]}. Should be a number data type`,
			});
		}
	}
	next();

};

/**
 * Checks if the users status input is a string and handles errors
 * @function { object } { statusValidation }
 * @param  { object } req - Contains the body of the request.
 * @param  { string } { status }
 * @return { object } res - Contains the returned response object.
 * @function  { next } - Proceeds to the next method on the route
 */
export const statusValidation = (req, res, next) => {
	const { status } = req.body;

	if (typeof status === "string") {
		return next();
	}

	return res.status(400).send({
		status: "Error",
		message: `Invalid input ${status}. Should be a string data type`,
	});
};

/**
 * Handles error for get a specific order route
 * @function { object } { getOrderErrorHandler }
 * @param  { object } req - Contains the body of the request.
 * @param  { array } output - result of the filtered orders dummyDB
 * @param  { number } id - specific order resource identifier
 * @return { object } res - Contains the returned response object.
 * @function  { next } - Proceeds to the next method on the route.
 */
export const getOrderErrorHandler = (req, res, next) => {
	const id = parseInt(req.params.id, 10);

	const output = orders.filter(order => order.orderId === id)[0];

	if (!output) {
		return res.status(404).send({
			status: "Error",
			message: "That resource isn't available"
		});
	}
	return next();
};

