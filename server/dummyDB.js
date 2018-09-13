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
                foods: ["Chief burger", "Rotisserie"],
                drinks: ["Coca-cola 50cl", "Five alive 1L"],
            },
        bill: {
            subtotal: 5550,
            discount: 0,
            delivery: 450,
            total: 6000,
        },
        status: false //PENDIND order fulfillment
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
            foods: ["Pot lovers menu", "Citizens meal"],
            drinks: ["Coca-cola 50cl", "Five alive 1L"],
        },
        bill: {
            subtotal: 7500,
            discount: 250,
            delivery: 500,
            total: 7750,
        },
        status: true //COMPLETED order
    },
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