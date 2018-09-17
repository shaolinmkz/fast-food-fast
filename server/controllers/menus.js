import { foodsDB, drinksDB } from "../dummyDB";

/**
 * @class \{{{object}}\} {{Menus}}{{Has methods that handle the menu api routes}}
 */
export class Menus {
	/**
   * Gets all food items available and handles errors
   * Checks if any food resource exists in the database
	 * @param  { empty } req - Empty body request
	 * @param  { object } res
   * @return { object } returns JSON object format
	 */
	getAllFoods(req,res) {
		if (!foodsDB) {
			return res.status(404).send({
				status: "Error",
				message: "This food menu isn't available",
			});
		}
		if (foodsDB.length < 1) {
			return res.status(404).send({
				status: "Error",
				message: "No menu available"
			});
		}
		return res.status(200).send({
			status: "Success",
			message: "All meals have been delivered successfully",
			menu: foodsDB,
		});
	}

	/**
   * Gets all drink items available and handles errors
   * Checks if any drink resource exists in the database
	 * @param  { empty } req - Empty body request
	 * @param  { object } res
   * @return { object } returns JSON object format
	 */
	getAllDrinks(req,res) {
		if (!drinksDB) {
			return res.status(404).send({
				status: "Error",
				message: "This drinks menu isn't available",
			});
		}
		if (drinksDB.length < 1) {
			return res.status(404).send({
				status: "Error",
				message: "No drinks available"
			});
		}
		return res.status(200).send({
			status: "Success",
			message: "All drinks have been delivered successfully",
			menus: drinksDB,
		});
	}

	/**
   * Gets a specific food item and handles errors
   * Checks if the food in question exists in the database using an id
	 * @param  { empty } req - Empty body request
   * @param  { id } id - Unique identifier for the food resource
	 * @param  { object } res
   * @return { object } returns JSON object format
	 */
	getFood(req, res) {
		const id = parseInt(req.params.id, 10);

		const output = foodsDB.filter((food) => food.id === id)[0];

		if (!output) {
			return res.status(400).send({
				status: "Error",
				message: "That food menu isn't available"
			});
		}
		if (output.length < 1) {
			return res.status(404).send({
				status: "Error",
				message: "Food is not found"
			});
		}
		return res.status(200).send({
			status: "Success",
			message: "Food menu delivered successfully",
			food_menu: output,
		});
	}

	/**
   * Gets a specific drink item and handles errors
   * Checks if the drink in question exists in the database using an id
	 * @param  { empty } req - Empty body request
   * @param  { id } id - Unique identifier for the drink resource
	 * @param  { object } res
   * @return { object } returns JSON object format
	 */
	getDrink(req, res) {
		const id = parseInt(req.params.id, 10);

		const output = drinksDB.filter((drink) => drink.id === id)[0];

		if (!output) {
			return res.status(404).send({
				status: "Error",
				message: "That drink menu isn't available"
			});
		}
		if (output.length < 1) {
			return res.status(404).send({
				status: "Error",
				message: "Drink is not found"
			});
		}
		return res.status(200).send({
			status: "Success",
			message: "Drink menu delivered successfully",
			drink_menu: output,
		});
	}
}
