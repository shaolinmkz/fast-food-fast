import { Helper } from "../auth";

export class MealValidator {

	static mealsCheck(req, res, next) {
		let { name, price } =req.body;
		let i =0;
		name = name.toString().trim(); price = price.toString().trim();

		const checkArr = [name, price];

		for (i = 0; i < checkArr.length; i++) {
			if (!checkArr[i]) {
				return res.status(400).json({
					status: "Error",
					message: "Required field empty"
				});
			}
		}

		if (name.length < 2) {
			return res.status(400).json({
				status: "Error",
				message: "A vaild product_name starts with at least 2 characters"
			});
		}


		if (!(Helper.isValidAlphabet(name.split(" ").join("").toString().toLowerCase()))) {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${name}. All characters must be alphabets`
			});
		}


		for (i = 0; i < price.length; i++) {
			if (price.toString().charAt(i) === " ") {
				return res.status(400).json({
					status: "Error",
					message: `Invalid input ${price}. Spaces are not required`
				});
			}
		}


		if (!(Helper.isValidNumber(price.toString()))) {
			return res.status(400).json({
				status: "Error",
				message: `Invalid input ${price}. All characters must be numbers`
			});
		}


		next();

	}

}

