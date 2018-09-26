import express from "express";
import { signupValidation, loginValidation, userExists, orderValidation } from "../middlewares";
import { Users } from "../controllers";
import { Helper } from "../auth";

const user = new Users();

const userRoutes = express.Router();

userRoutes.get("/api/v2/users", user.fetchUsers); /**for testing*/
userRoutes.post("/api/v2/auth/signup", signupValidation, userExists, user.createNewUsers);
userRoutes.post("/api/v2/auth/login", loginValidation, user.loginUser);
userRoutes.post("/api/v2/logout", user.logoutUser);
userRoutes.post("/api/v2/orders", Helper.verifyUsersToken, orderValidation, user.placeOrder);
userRoutes.get("/api/v2/users/:id/orders", Helper.verifyUsersToken, user.fetchUsersOrderHistory);
userRoutes.get("/api/v2/menu", user.getAllMenu);  /**Get all menu */

export default userRoutes;
