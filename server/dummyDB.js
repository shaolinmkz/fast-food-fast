//Order
export const orders = [
	{
		id: 1,
		shippingdetails: {
			firstname: "Jane",
			lastname: "Doe",
			email: "janedoe@testmail.com",
			phone: +2348077777777,
			addressNo: 23,
			address: "xyz road behind maggi cube",
			lga: "lagos Island",
			state: "lagos state",
		},
		items: {
			foods: ["chief burger", "rotisserie"],
			drinks: ["coca-cola 50cl", "five alive 1L"],
		},
		bill: {
			subtotal: 5550,
			discount: 0,
			delivery: 450,
			total: 6000,
		},
		status: "pending" //PENDIND order fulfillment
	},

	{
		id: 2,
		shippingdetails: {
			firstname: "John",
			lastname: "Doe",
			email: "johndoe@testmail.com",
			phone: +2348033333333,
			addressNo: 45,
			address: "abc street beside knorr cube",
			lga: "Apapa",
			state: "Lagos state",
		},
		items: {
			foods: ["pot lovers menu", "citizens meal"],
			drinks: ["coca-cola 50cl", "fanta orange 50cl"],
		},
		bill: {
			subtotal: 7500,
			discount: 250,
			delivery: 500,
			total: 7750,
		},
		status: "declined" //Declined order
	},

	{
		id: 3,
		shippingdetails: {
			firstname: "Mark",
			lastname: "Juliet",
			email: "markjuliet@testmail.com",
			phone: +2348039372235,
			addressNo: 8,
			address: "xyz street park beside indomie noodles",
			lga: "somolu",
			state: "Lagos state",
		},
		items: {
			foods: ["wrapstar meal", "spicy crunchy"],
			drinks: ["coca-cola zero 50cl", "eva mineral water 75cl"],
		},
		bill: {
			subtotal: 14500,
			discount: 725,
			delivery: 500,
			total: 14275,
		},
		status: "completed" //COMPLETED order
	}
];


//Menus
export const foodsDB = [
	{ name: "rice and beans", price: 600},
	{ name: "citizens meal", price: 1350},
	{ name: "naija 58 meal", price: 1200},
	{ name: "chief burger", price: 1050},
	{ name: "rotisserie chicken", price: 3900},
	{ name: "spicy crunchy chicken", price: 500},
	{ name: "pot lovers menu", price: 5900},
	{ name: "wrapstar meal", price: 1500}
];

export const drinksDB = [
	{ name: "eva mineral water 75cl", price: 250},
	{ name: "five alive pulpy orange 40cl", price: 400},
	{ name: "coca cola 50cl", price: 300},
	{ name: "coca cola zero 50cl", price: 300},
	{ name: "fanta orange 50cl", price: 300},
	{ name: "five alive 1L", price: 600},
];

// export const foods = {
//     riceAndBeans: { name: "Rice And Beans", price: 600 },
//     citizensMeal: { name: "Citizens Meal", price: 1350 },
//     naija58Meal: { name: "Naija 58 Meal", price: 1200 },
//     chiefBurger: { name: "Chief Burger", price: 1050 },
//     rotisserieChicken: { name: "Rotisserie Chicken", price: 3900 },
//     spicyCrunchyChicken: { name: "Spicy Crunchy Chicken", price: 500 },
//     potLoversMenu: { name: "Pot Lovers Menu", price: 5900 },
//     wrapstarMeal: { name: "Wrapstar Meal", price: 1500 },
// };

// export const drinks = {
//     evaMineralWater75cl: { name: "Eva Mineral Water 75cl", price: 250 },
//     fiveAlivePulpyOrange40cl: { name: "Five Alive Pulpy Orange 40cl", price: 400 },
//     cocaCola50cl: { name: "Coca Cola 50cl", price: 300 },
//     cocaColaZero50cl: { name: "Coca Cola Zero 50cl", price: 300 },
//     fantaOrange50cl: { name: "Fanta Orange 50cl", price: 300 },
//     fiveAlive1L: { name: "Five Alive 1L", price: 600 },
// };