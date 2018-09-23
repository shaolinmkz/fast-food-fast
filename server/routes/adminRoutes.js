import express from "express";

import { adminSignupValidation, adminLoginValidation } from "../middlewares";

import { signupValidation } from "../middlewares";

import { Admins } from "../controllers";

const admin = new Admins();

const adminRoutes = express.Router();

adminRoutes.get("./api/v2/auth/admins", admin.fetchAdmins); /**For testing */
adminRoutes.post("./api/v2/auth/signup", signupValidation, adminSignupValidation, admin.createNewAdmins);
adminRoutes.post("./api/v2/auth/login", adminLoginValidation, admin.loginAdmin);
adminRoutes.post("./api/v2/auth/logout", admin.logoutAdmin);
adminRoutes.post("/api/v2/auth/admin");
adminRoutes.get("/api/v2/orders");
adminRoutes.get("/api/v2/orders/:id");
adminRoutes.put("/api/v2/orders/:id");
adminRoutes.post("/api/v2/orders/menu");

export default adminRoutes;