import { orders } from "../dummyDB";
import { OrderedMeals, Billings, PhoneConverts } from "../middlewares";

const orderedMeals = new OrderedMeals();
const billing = new Billings();
const convert = new PhoneConverts();

/** Class that handles request from end users. */
export default class Orders{

	/**
   * Uses information from the end user to create a bill for orders placed.
   * The users information is saved to a dummyDB.
	 * @param  {object} req - Contains the body of the request.
	 * @param  {object} res - Contains the returned bill.
	 */
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

	/**
   * Gets all orders in the dummyDB.
   * Checks if any resource exists in the dummyDB
	 * @param  {empty} req - req is empty because this method handle a get request
	 * @param  {object} res - The object containining data
   * @param  {object} orders - The placed order from the dummyDB
	 */
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

	/**
   * Get a specific order in the dummyDB using its id,
   * and returns the order
	 * @param  { object} req - body request from client side
	 * @param  { object} res - response to body request
   * @param  { number} id - Resource id
   * @param  { object } order - This will be saved in an array(output) if true.
   * @return { object } JSON format of specific order
	 */
	getAnOrder(req, res) {
		const id = parseInt(req.params.id, 10);
		const output = orders.filter((order) => order.id === id)[0];
		return res.status(200).send({
			status: "Success",
			message: "Order delivered successfully",
			order: output,
		});
	}
	/**
   * Updates the status of an order placed by a customer
	 * @param  { object } req - body request from client side
	 * @param  { object } res - response to body request
	 * @param  { string } status - The string containing order status
   * @return { object } JSON format of updated order status
	 */
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
