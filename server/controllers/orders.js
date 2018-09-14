import { orders, foodsDB, drinksDB } from "../dummyDB";

export default class Orders{

    placeOrder(req, res){
        const {
            firstname,
            lastname,
            email,
            phone,
            addressNo,
            address,
            lga,
            state,            
        } = req.body;

        let { foods, drinks } = req.body;

        const id = (orders.length + 1);
    

    const orderedMeals = {
        displayDrinks() {

            //If food item is array carry on
            if (Array.isArray(drinks)) {
                return drinks;
            }
                //If drink items is not an array create an array
            if (typeof drinks === "string" || !Array.isArray(drinks)) {
                    const newdrinks = drinks.split(",");
                    return newdrinks;
                }
        },
        displayFoods(){

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

        //BILLING
        const billing = {
        subtotal() {
            if ((orderedMeals.displayDrinks().length + orderedMeals.displayFoods().length) > 5 ) {
                return ((500 * orderedMeals.displayDrinks().length) + (800 * orderedMeals.displayFoods().length ));
            } else {
                return ((600 * 3));
            }
        },
        discount() { 
            if (billing.subtotal() > 5000) {
                const discount = 0.05 * billing.subtotal();
                return discount;
            } else {
                return 0;
            }
        },
        delivery() {
            if ((orderedMeals.displayDrinks().length + orderedMeals.displayFoods().length) > 5) {
                return 500;
            } else {
                return 250;
            }
        },
        total() {
            let total = ((billing.subtotal() - billing.discount()) + billing.delivery());
            return total;
        }
    }

    const convert = {
        convertPhoneNumber() {
            if (phone.length === 10) {
                let temp = phone.toString();
                return Number("+234" + temp);
            } else if (phone.length === 11) {
                let temp = phone.toString().slice(1, phone.length);
                return Number("234" + temp);
            } else {
                return Number(phone);
            }
        },
        convertAddressNo(){
            return Number(addressNo);
        }
    }

        const orderContainer = {
            id,
            shippingdetails: {
                firstname,
                lastname,
                email,
                phone: convert.convertPhoneNumber(),
                addressNo: convert.convertAddressNo(),
                address,
                lga,
                state },
            items:{
                foods: orderedMeals.displayFoods(),
                drinks: orderedMeals.displayDrinks()
            },
            bill: {
                subtotal: `₦${billing.subtotal()}` ,
                discount: `₦${billing.discount()}` ,
                delivery: `₦${billing.delivery()}` ,
                total: `₦${billing.total()}`
                },
                status: "pending",
            }

            orders.push(orderContainer);

            return res.status(201)
                    .json({
                        status: "Success",
                        message: "Order has been placed successfully",
                        orderDetails: orderContainer
                    });
    }

    getAllOrders(req, res) {

        if (!orders) {
            return res.status(404).send({
                status: "Error",
                message: "That resource isn't available",
            });
        }

        if (orders.length < 1) {
            return res.status(404).send({
                status: "Error",
                message: "No pending order available"
            });
        }

        return res.status(200).send({
            status: "Success",
            message: "All pending orders delivered successfully",
            orders: orders,
        });
    }

    getAnOrder(req, res) {
        const id = parseInt(req.params.id, 10);

        const output = orders.filter((order) => order.id === id)[0];
        
        if (!output){
            return res.status(404).send({
                status: "Error",
                message: "That resource isn't available"
            });
        }

        if (output.length < 1) {
            return res.status(404).send({
                status: "Error",
                message: "Order is not found"
            });
        }

        return res.status(200).send({
            status: "Success",
            message: "Order delivered successfully",
            order: output,
        });
    }

    updateStatus(req, res) {
        const { status } = req.body;
        const id = parseInt(req.params.id, 10);

        const output = orders.filter((order) => order.id === id)[0];

        if (!output) {
            return res.status(404).send({
                status: "Error",
                message: "That resource isn't available"
            });
        }

        if (output.length < 1) {
            return res.status(404).send({
                status: "Error",
                message: "Order is not found"
            });
        }

        if (output.status === "pending") {
            output["status"] = status;
        }

        output.status = status;

        return res.status(201).send({
            status: "Updated",
            message: "Status has been updated",
            output
        });
    }
}