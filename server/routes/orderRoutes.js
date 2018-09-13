import express from "express";
import { Orders } from "../controllers";
import { orderValidation } from "../middlewares";

const orders = new Orders();
const orderRoutes = express.Router();

orderRoutes.post("/api/v1/orders", orderValidation, orders.placeOrder);

export default orderRoutes;