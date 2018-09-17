export class OrderedMeals {
	displayDrinks(drinks) {
		//If food item is array carry on
		if (Array.isArray(drinks)) {
			return drinks;
		}
		//If drink items is not an array create an array
		if (typeof drinks === "string" || !Array.isArray(drinks)) {
			const newdrinks = drinks.split(",");
			return newdrinks;
		}
	}
	displayFoods(foods) {
		//If food item is array carry on
		if (Array.isArray(foods)) {
			return foods;
		}
		//User needs to use comma's to separate multiple food items
		//If food items is not an array create an array
		if (!Array.isArray(foods) || typeof foods === "string") {
			const newfoods = foods.split(",");
			return newfoods;
		}
	}
}

export class Billings {
	subtotal(drinks, foods) {
		const orderedMeals = new OrderedMeals();
		if ((orderedMeals.displayDrinks(drinks).length + orderedMeals.displayFoods(foods).length) > 5) {
			return ((500 * orderedMeals.displayDrinks(drinks).length) + (800 * orderedMeals.displayFoods(foods).length));
		} else {
			return ((600 * 3));
		}
	}
	discount(drinks, foods) {
		const billing = new Billings();
		if (billing.subtotal(drinks, foods) > 5000) {
			const discount = 0.05 * billing.subtotal();
			return discount;
		} else {
			return 0;
		}
	}
	delivery(drinks, foods) {
		const orderedMeals = new OrderedMeals();
		if ((orderedMeals.displayDrinks(drinks).length + orderedMeals.displayFoods(foods).length) > 5) {
			return 500;
		} else {
			return 250;
		}
	}
	total(drinks, foods) {
		const billing = new Billings();
		let total = (
			(billing.subtotal(drinks, foods) -
            billing.discount(drinks, foods)) +
            billing.delivery(drinks, foods));
		return total;
	}
}

export class PhoneConverts {
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
	convertAddressNo(addressNo) {
		return Number(addressNo);
	}
}
