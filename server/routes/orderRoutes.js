import express from "express";
import { Orders } from "../controllers";
import { orderValidation } from "../middlewares";

const orders = new Orders();
const orderRoutes = express.Router();

orderRoutes.post("/api/v1/orders", orderValidation, orders.placeOrder);
orderRoutes.get("/api/v1/orders", orders.getAllOrders);
orderRoutes.get("/api/v1/orders/:id", orders.getAnOrder);

export default orderRoutes;