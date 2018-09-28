import { foodsDB, drinksDB } from "../dummyDB";


/**
 * @class \{{{object}}\} {{OrderedMeals}}{{Class that handles request from the client side.}}
 */
export class OrderedMeals {

	/**
   * Converts string to array.
	 * @param  { object } drinks - An array object of drinks.
   * @param  { string } drinks - A string of drinks.
   * @return { object } newdrinks - Array object
	 */
	displayDrinks(drinks) {
		if (Array.isArray(drinks)) {
			return drinks;
		}else {
			const newdrinks = drinks.split(",");

			return newdrinks;
		}
	}

	/**
   * Converts string to array.
	 * @param  { object } foods - An array object of foods.
   * @param  { string } foods - A string of foods.
   * @return { object } newfoods - Array object
	 */
	displayFoods(foods) {
		if (Array.isArray(foods)) {
			return foods;
		}else {
			const newfoods = foods.split(",");
			return newfoods;
		}
	}
}

/**
 * @class \{{{object}}\} {{Billings}}{{Has methods that bills customer when order is placed}}
 */
export class Billings {

	/**
   * Calculates the subtotal.
	 * @param  { object } foods - An array object of strings.
   * @param  { object } drinks - An array of strings.
   * @param  { object } foodsQuantity - An array of numbers
   * @param  { object } drinksQuantity - An array of numbers
   * @return { number }
	 */
	subtotal(drinks, foods, foodsQuantity, drinksQuantity) {
		const bill = new Billings();
		const sub = ((bill.getFoodsPrice(foods, foodsQuantity)) + (bill.getDrinksPrice(drinks, drinksQuantity)));
		return sub;
	}
	/**
   * Calculates the total price of foods.
	 * @param  { object } foods - An array object of strings.
   * @param  { object } foodsQuantity - An array of strings.
   * @return { number }
	 */
	getFoodsPrice(foods, foodsQuantity) {
		let i, j, cost = 0;
		const orderedMeals = new OrderedMeals();
		const foodsCheck = orderedMeals.displayDrinks(foods);


		if (foodsCheck[0] === "") {
			return 0;
		}

		for (i = 0; i < foodsCheck.length; i++) {
			for (j = 0; j < foodsDB.length; j++) {
				if (foodsCheck[i].trim() === foodsDB[j].name) {
					cost += (foodsDB[j].price * (foodsQuantity[i]));
				}
			}
		}
		return cost;
	}

	/**
   * Calculates the total price of drinks.
	 * @param  { object } drinks - An array object of drinks.
   * @param  { object } drinksQuantity - An array of numbers.
   * @return { number }
	 */
	getDrinksPrice(drinks, drinksQuantity) {
		let i, j, cost = 0;
		const orderedMeals = new OrderedMeals();
		const drinksCheck = orderedMeals.displayFoods(drinks);


		if (drinksCheck[0] === "") {
			return 0;
		}

		for (i = 0; i < drinksCheck.length; i++) {
			for (j = 0; j < drinksDB.length; j++) {
				if (drinksCheck[i].trim() === drinksDB[j].name) {
					cost += (drinksDB[j].price * (drinksQuantity[i]));
				}
			}
		}
		return cost;
	}



	/**
   * Calculates the discount.
	 * @param  { object } foods - An array object of foods.
   * @param  { object } drinks - An array of drinks.
   * @return { number } discount
	 */
	discount(drinks, foods, foodsQuantity, drinksQuantity) {
		const bill = new Billings();
		const subtotal = bill.subtotal(drinks, foods, foodsQuantity, drinksQuantity);
		if (subtotal > 5000) {
			return (0.05 * subtotal);
		} else if (subtotal > 10000) {
			return (0.1 * subtotal);
		} else {
			return 0;
		}
	}

	/**
   * Calculates the delivery.
	 * @param  { object } foods - An array object of foods.
   * @param  { object } drinks - An array of drinks.
   * @return { number } discount
	 */
	delivery(drinks, foods) {
		const orderedMeals = new OrderedMeals();
		if ((orderedMeals.displayDrinks(drinks).length + orderedMeals.displayFoods(foods).length) > 5) {
			return 500;
		} else {
			return 250;
		}
	}

	/**
   * Calculates the total.
	 * @param  { object } foods - An array object of foods.
   * @param  { object } drinks - An array of drinks.
   * @param  { object } foodsQuantity - An array object of quantity foods.
   * @param  { object } drinksQuantity - An array of quantity drinks.
   * @return { number } total
	 */
	total(drinks, foods, foodsQuantity, drinksQuantity) {
		const bill = new Billings();
		let total = (
			(bill.subtotal(drinks, foods, foodsQuantity, drinksQuantity) -
      bill.discount(drinks, foods, foodsQuantity, drinksQuantity)) +
      bill.delivery(drinks, foods));
		return total;
	}
}



