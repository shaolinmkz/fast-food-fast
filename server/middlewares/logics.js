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
		}
		if (typeof drinks === "string" || !Array.isArray(drinks)) {
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
		}
		if (!Array.isArray(foods) || typeof foods === "string") {
			const newfoods = foods.split(",");
			return newfoods;
		}
	}
}

/**
 * @class \{{{object}}\} {{Billings}}{{Has methods that bills customer when other is placed}}
 */
export class Billings {

	/**
   * Calculates the subtotal.
	 * @param  { object } foods - An array object of foods.
   * @param  { object } drinks - An array of drinks.
   * @return { number }
	 */
	subtotal(drinks, foods) {
		const orderedMeals = new OrderedMeals();
		if ((orderedMeals.displayDrinks(drinks).length + orderedMeals.displayFoods(foods).length) > 5) {
			return ((500 * orderedMeals.displayDrinks(drinks).length) + (800 * orderedMeals.displayFoods(foods).length));
		} else {
			return ((600 * 3));
		}
	}

	/**
   * Calculates the discount.
	 * @param  { object } foods - An array object of foods.
   * @param  { object } drinks - An array of drinks.
   * @return { number } discount
	 */
	discount(drinks, foods) {
		const billing = new Billings();
		if (billing.subtotal(drinks, foods) > 5000) {
			const discount = 0.05 * billing.subtotal();
			return discount;
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
   * @return { number } total
	 */
	total(drinks, foods) {
		const billing = new Billings();
		let total = (
			(billing.subtotal(drinks, foods) -
            billing.discount(drinks, foods)) +
            billing.delivery(drinks, foods));
		return total;
	}
}

/**
 * @class \{{{object}}\} {{PhoneConverts}}{{Has methods that converts strings to numbers}}
 */
export class PhoneConverts {

	/**
   * Converts string to number datatype.
   * Append the postal code +234 to the start and removes any leading zero
	 * @param  { object } phone - An string of digits.
   * @param  { number } phone - A number of digits
   * @return { number } phone
	 */
	convertPhoneNumber(phone) {
		if (phone.length === 10) {
			let temp = phone.toString();
			return Number("+234" + temp);
		} else if (phone.length === 11) {
			let temp = phone.toString().slice(1, phone.length);
			return Number("234" + temp);
		} else {
			return Number(phone);
		}
	}

	/**
   * Converts string to number datatype.
	 * @param  { object } addressNo - An string of digit(s).
   * @param  { number } addressNo - A number of digit(s)
   * @return { number } addressNo
	 */
	convertAddressNo(addressNo) {
		return Number(addressNo);
	}
}
