import { orders } from "../dummyDB";
import { OrderedMeals, Billings, PhoneConverts } from "../middlewares";

const orderedMeals = new OrderedMeals();
const billing = new Billings();
const convert = new PhoneConverts();

export default class Orders{
	placeOrder(req, res){
		const { firstname, lastname, email, phone,
			addressNo, address, lga, state } = req.body;
		let { foods, drinks } = req.body;
		const id = (orders.length + 1);
		
		const orderContainer = {
			id,
			shippingdetails: { firstname, lastname, email,
				phone: convert.convertPhoneNumber(phone),
				addressNo: convert.convertAddressNo(addressNo),
				address, lga, state },
			items:{
				foods: orderedMeals.displayFoods(foods),
				drinks: orderedMeals.displayDrinks(drinks)
			},
			bill: {
				subtotal: `₦${billing.subtotal(drinks, foods)}` ,
				discount: `₦${billing.discount(drinks, foods)}` ,
				delivery: `₦${billing.delivery(drinks, foods)}` ,
				total: `₦${billing.total(drinks, foods)}`
			},
			status: "pending",
		};
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