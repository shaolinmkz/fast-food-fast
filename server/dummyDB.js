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
	{ id: 1, name: "rice and beans", price: 600 },
	{ id: 2, name: "citizens meal", price: 1350 },
	{ id: 3, name: "naija 58 meal", price: 1200 },
	{ id: 4, name: "chief burger", price: 1050 },
	{ id: 5, name: "rotisserie chicken", price: 3900 },
	{ id: 6, name: "spicy crunchy chicken", price: 500 },
	{ id: 7, name: "pot lovers menu", price: 5900 },
	{ id: 8, name: "wrapstar meal", price: 1500 }
];

export const drinksDB = [
	{ id: 1, name: "eva mineral water 75cl", price: 250 },
	{ id: 2, name: "five alive pulpy orange 40cl", price: 400 },
	{ id: 3, name: "coca cola 50cl", price: 300 },
	{ id: 4, name: "coca cola zero 50cl", price: 300 },
	{ id: 5, name: "fanta orange 50cl", price: 300 },
	{ id: 6, name: "five alive 1L", price: 600 },
];