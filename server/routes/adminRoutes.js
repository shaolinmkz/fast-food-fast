import express from "express";

import { adminSignupValidation, adminLoginValidation } from "../middlewares";

import { Helper } from "../auth";

import { insertFoods, insertDrinks } from "../db/pushAllMenus";
import { insertUsers, insertAdmins } from "../db/populateTable";

import { signupValidation, MealValidator } from "../middlewares";

import { Admins } from "../controllers";

const admin = new Admins();

const adminRoutes = express.Router();

adminRoutes.get("/api/v2/admins", admin.fetchAdmins); /**For testing, gets all admins*/
adminRoutes.post("/api/v2/pushall", insertAdmins, insertUsers, insertFoods, insertDrinks); /**For testing, populate database table*/

adminRoutes.post("/api/v2/auth/admin/signup", signupValidation, adminSignupValidation, admin.createNewAdmins);/**admin signup */
adminRoutes.post("/api/v2/auth/admin/login", adminLoginValidation, admin.loginAdmin); /**admin login*/
adminRoutes.post("/api/v2/admin/logout", admin.logoutAdmin); /**logout admin */

adminRoutes.post("/api/v2/admin/menu/drinks", Helper.verifyAdminsToken, MealValidator.mealsCheck, admin.addDrinks); /**add drinks menu */
adminRoutes.post("/api/v2/admin/menu/foods", Helper.verifyAdminsToken, MealValidator.mealsCheck, admin.addFoods); /**add foods menu */

adminRoutes.get("/api/v2/orders", Helper.verifyAdminsToken, admin.fetchAllOrders);
adminRoutes.get("/api/v2/orders/:id", Helper.verifyAdminsToken, admin.getASpecificOrder);
adminRoutes.put("/api/v2/orders/:id", Helper.verifyAdminsToken, admin.updateOrderStatus);

export default adminRoutes;


