/**
 * @module \{{{object}}\} {{usersInfo}}{{dummy database data structure for customers credentials}}
 */
export const usersData = [
	{
		usersId: 1,
		firstname: "Jane",
		lastname: "Doe",
		email: "janedoe@testmail.com",
		phone: +2348077777777,
		addressNo: 23,
		address: "xyz road behind maggi cube",
		lga: "lagos Island",
		state: "lagos state",
	},
	{
		usersId: 2,
		firstname: "John",
		lastname: "Doe",
		email: "johndoe@testmail.com",
		phone: +2348033333333,
		addressNo: 45,
		address: "abc street beside knorr cube",
		lga: "Apapa",
		state: "Lagos state",
	},
	{
		usersId: 3,
		firstname: "Mark",
		lastname: "Juliet",
		email: "markjuliet@testmail.com",
		phone: +2348039372235,
		addressNo: 8,
		address: "xyz street park beside indomie noodles",
		lga: "somolu",
		state: "Lagos state",
	}
];

/**
 * @module \{{{object}}\} {{orders}}{{dummy database data structure for client side orders}}
 */
export const orders = [
	{
		orderId: 1,
		shippingdetails: usersData[0],
		items: {
			foods: ["chief burger", "rotisserie"],
			drinks: ["coca-cola 50cl", "five alive 1L"],
		},
		bill: {
			subtotal: `₦${5000}`,
			discount: `₦${0}`,
			delivery: `₦${450}`,
			total: `₦${5450}`,
		},
		orderedDateTime: Date(),
		status: "pending"
	},

	{
		orderId: 2,
		shippingdetails: usersData[1],
		items: {
			foods: ["pot lovers menu", "citizens meal"],
			drinks: ["coca-cola 50cl", "fanta orange 50cl"],
		},
		bill: {
			subtotal: `₦${7500}`,
			discount: `₦${250}`,
			delivery: `₦${500}`,
			total: `₦${7750}`,
		},
		orderedDateTime: Date(),
		status: "pending"
	},

	{
		orderId: 3,
		shippingdetails: usersData[2],
		items: {
			foods: ["wrapstar meal", "spicy crunchy"],
			drinks: ["coca-cola zero 50cl", "eva mineral water 75cl"],
		},
		bill: {
			subtotal: `₦${14500}`,
			discount: `₦${725}`,
			delivery: `₦${500}`,
			total: `₦${14275}`,
		},
		orderedDateTime: Date(),
		status: "pending"
	}
];

/**
 * @module \{{{object}}\} {{foodsDB}}{{dummy database data structure for food menus and prices}}
 */
export const foodsDB = [
	{ foodId: 1, name: "rice and beans", price: 600 },
	{ foodId: 2, name: "citizens meal", price: 1350 },
	{ foodId: 3, name: "naija 58 meal", price: 1200 },
	{ foodId: 4, name: "chief burger", price: 1050 },
	{ foodId: 5, name: "rotisserie chicken", price: 3900 },
	{ foodId: 6, name: "spicy crunchy chicken", price: 500 },
	{ foodId: 7, name: "pot lovers menu", price: 5900 },
	{ foodId: 8, name: "wrapstar meal", price: 1500 }
];

/**
 * @module \{{{object}}\} {{drinksDB}}{{dummy database data structure for drinks menu and prices}}
 */
export const drinksDB = [
	{ drinkId: 1, name: "eva mineral water 75cl", price: 250 },
	{ drinkId: 2, name: "five alive pulpy orange 40cl", price: 400 },
	{ drinkId: 3, name: "coca cola 50cl", price: 300 },
	{ drinkId: 4, name: "coca cola zero 50cl", price: 300 },
	{ drinkId: 5, name: "fanta orange 50cl", price: 300 },
	{ drinkId: 6, name: "five alive 1L", price: 600 },
];
