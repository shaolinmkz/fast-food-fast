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
                food: ["Chief burger", "Rotisserie"],
                drinks: ["Coca-cola 50cl", "Five alive 1L"],
            },
        bill: {
            subtotal: 5550,
            discount: 0,
            delivery: 450,
            total: 6000,
        },
        status: false
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
            food: ["Pot lovers menu", "Citizens meal"],
            drinks: ["Coca-cola 50cl", "Five alive 1L"],
        },
        bill: {
            subtotal: 7500,
            discount: 250,
            delivery: 500,
            total: 7750,
        },
        status: true
    },
]