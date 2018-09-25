import express from "express";

import { adminSignupValidation, adminLoginValidation } from "../middlewares";

import { Helper } from "../auth";
import { insertFoods, insertDrinks } from "../db/pushAllMenus";
import { signupValidation, MealValidator } from "../middlewares";

import { Admins } from "../controllers";

const admin = new Admins();

const adminRoutes = express.Router();

adminRoutes.get("/api/v2/admins", admin.fetchAdmins); /**For testing, gets all admins*/
adminRoutes.post("/api/v2/admin/push", insertFoods, insertDrinks); /**For testing, pushes all menu to db*/

adminRoutes.post("/api/v2/auth/admin/signup", signupValidation, adminSignupValidation, admin.createNewAdmins);/**admin signup */
adminRoutes.post("/api/v2/auth/admin/login", adminLoginValidation, admin.loginAdmin); /**admin login*/
adminRoutes.post("/api/v2/admin/logout", admin.logoutAdmin); /**logout admin */

adminRoutes.post("/api/v2/admin/menu/drinks", Helper.verifyToken, MealValidator.mealsCheck, admin.addDrinks); /**add drinks */
adminRoutes.post("/api/v2/admin/menu/foods", Helper.verifyToken, MealValidator.mealsCheck, admin.addFoods); /**add foods */

adminRoutes.get("/api/v2/orders");
adminRoutes.get("/api/v2/orders/:id");
adminRoutes.put("/api/v2/orders/:id");
adminRoutes.post("/api/v2/orders/menu");

export default adminRoutes;


