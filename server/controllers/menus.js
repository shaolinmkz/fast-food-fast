import { foodsDB, drinksDB } from "../dummyDB";

export class Menus {
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
			menu: output,
		});
	}

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
			menu: output,
		});
	}
}
