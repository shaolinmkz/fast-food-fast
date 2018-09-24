import { orders, usersData } from "../dummyDB";
import { OrderedMeals, Billings } from "../middlewares";

/**
 * @class \{{{object}}\} {{OrderedMeals}}{{new instance - orderedMeals}}
 * @class \{{{object}}\} {{Billings}}{{new instance - billing}}
 * @class \{{{object}}\} {{PhoneConverts}}{{new instance - convert}}
 */
const orderedMeals = new OrderedMeals();
const billing = new Billings();

/**
 * @class \{{{object}}\} {{Orders}}{{Class that handles request from the client side.}}
 */
export default class Orders{
	/**
   * Uses information from the end user to create a bill for orders placed.
   * The users information is saved to a dummyDB.
	 * @param  { object } req - Contains the body of the request.
   * @param  { string } { firstname, lastname, email, address, lga, state, phone, addressNo, foods, drinks }
   * @param  { number } { phone, addressNo, id } - id is generated automatically
   * @param  { array }  { foods, drinks }
	 * @param  { object } res
   * @return { object } returns JSON format for placed order
	 */
	placeOrder(req, res){
		const { userId, addressNo, address, lga, state,
			foodsQuantity, drinksQuantity } = req.body;

		let { foods, drinks } = req.body;

		const orderId = (orders.length + 1);

		const userInfo = usersData.filter((elem)=>{
			if (elem.usersId === userId) {
				return elem;
			}
		})[0];

		if (!userInfo) {
			return res.status(400).json({
				status: "Error",
				message: "User doesn't exist"
			});
		}

		userInfo.addressNo = addressNo;
		userInfo.address = address;
		userInfo.lga = lga;
		userInfo.state = state;

		const orderContainer = {
			orderId,
			shippingdetails: userInfo,
			items:{
				foods: orderedMeals.displayFoods(foods),
				drinks: orderedMeals.displayDrinks(drinks)
			},
			bill: {
				subtotal: `₦${billing.subtotal(drinks, foods, foodsQuantity, drinksQuantity)}` ,
				discount: `₦${billing.discount(drinks, foods, foodsQuantity, drinksQuantity)}` ,
				delivery: `₦${billing.delivery(drinks, foods)}` ,
				total: `₦${billing.total(drinks, foods, foodsQuantity, drinksQuantity)}`
			},
			orderedDateTime: Date(),
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
	 * @param  { empty } req - req is empty because this method handle a get request
	 * @param  { object } res - The object containining data
   * @param  { object } orders - The placed order from the dummyDB
   * @return { object } returns a JSON format for get all orders
	 */
	getAllOrders(req, res) {
		return res.status(200).send({
			status: "Success",
			message: "All orders received successfully",
			orders: orders,
		});
	}

	/**
   * Get a specific order in the dummyDB using its id,
   * and returns the order
	 * @param  { object } req - body request from client side
	 * @param  { object } res - response to body request
   * @param  { number } id - Resource id
   * @param  { object } order - This will be saved in an array(output) if true.
   * @return { object } returns a JSON format of specific order
	 */
	getAnOrder(req, res) {
		const id = parseInt(req.params.id, 10);
		const output = orders.filter(order => order.orderId === id)[0];
		return res.status(200).send({
			status: "Success",
			message: "Order received successfully",
			order: output,
		});
	}

	/**
   * Updates the status of an order placed by a customer
	 * @param  { object } req - body request from client side
	 * @param  { object } res - response to body request
	 * @param  { string } status - The string containing order status
   * @return { object } returns JSON format of updated order status
	 */
	updateStatus(req, res) {
		// const { accept, decline, completed } = req.body;
		const { status } = req.body;
		const id = parseInt(req.params.id, 10);
		const output = orders.filter((order) => order.orderId === id)[0];

		if (!output) {
			return res.status(404).send({
				status: "Error",
				message: "That resource isn't available"
			});
		}
		output.status = status;
		return res.status(201).send({
			status: "Updated",
			message: "Status has been updated",
			output
		});
	}
}
