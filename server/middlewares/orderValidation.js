import { orders } from "../dummyDB";

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
	const { firstname, lastname, email, phone, addressNo,
		address, lga, state, foods, drinks } = req.body;

	const reqArray = [firstname, lastname, email, phone,
		addressNo, address, lga, state, foods, drinks];

	for (i in reqArray) {
		if (!reqArray[i]) {
			return res.status(400).send({
				status: "Error",
				message: "One or more input fields are empty or has invalid input",
			});
		}
		i++;
	}

	const strings = [firstname, lastname, email,
		address, lga, state];

	for(i in strings) {
		if (typeof strings[i] !== "string") {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${strings[i]}. Should be a string data type`,
			});
		}
		i++;
	}

	const numStr = [phone, addressNo];
	for(i in numStr) {
		if (typeof numStr[i] !== "number" && typeof numStr[i] !== "string") {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${numStr[i]}. Should be a number data type`,
			});
		}
		i++;
	}

	const objStr = [foods, drinks];
	for (i in objStr) {
		if (typeof objStr[i] !== "string" && !Array.isArray(objStr[i])) {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${objStr[i]}. Should be an Array object or a string data type`,
			});
		}
		i++;
	}

	return next();
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

	const output = orders.filter((order) => order.id === id)[0];

	if (!output) {
		return res.status(404).send({
			status: "Error",
			message: "That resource isn't available"
		});
	}

	if (output.length < 1) {
		return res.status(404).send({
			status: "Error",
			message: "Order is not found"
		});
	}
	return next();
};
