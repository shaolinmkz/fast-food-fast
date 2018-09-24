import express from "express";
import { signupValidation, loginValidation, userExists } from "../middlewares";
import { Users } from "../controllers";

const user = new Users();

const userRoutes = express.Router();

userRoutes.get("/api/v2/auth/users", user.fetchUsers); /**for testing*/
userRoutes.post("/api/v2/auth/signup", signupValidation, userExists, user.createNewUsers);
userRoutes.post("/api/v2/auth/login", loginValidation, user.loginUser);
userRoutes.post("/api/v2/auth/logout", user.logoutUser);
userRoutes.post("/api/v2/orders");
userRoutes.get("/api/v2/user/:id/orders");
userRoutes.get("/api/v2/menu");

export default userRoutes;
