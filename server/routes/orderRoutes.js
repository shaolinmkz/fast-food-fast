import express from "express";
import { Orders, Menus } from "../controllers";
import { orderValidation, useridAddressNoCheck, statusValidation, getOrderErrorHandler } from "../middlewares";

const orders = new Orders();
const menus = new Menus();

const orderRoutes = express.Router();
/**DUMMY DATABASE ROUTES**/
orderRoutes.post("/api/v1/orders", orderValidation, useridAddressNoCheck, orders.placeOrder);
orderRoutes.get("/api/v1/orders", orders.getAllOrders);
orderRoutes.get("/api/v1/orders/:id", getOrderErrorHandler, orders.getAnOrder);
orderRoutes.put("/api/v1/orders/:id", statusValidation, orders.updateStatus);
orderRoutes.get("/api/v1/orders/menus/foods", menus.getAllFoods);
orderRoutes.get("/api/v1/orders/menus/drinks", menus.getAllDrinks);
orderRoutes.get("/api/v1/orders/menus/foods/:id", menus.getFood);
orderRoutes.get("/api/v1/orders/menus/drinks/:id", menus.getDrink);

export default orderRoutes;
