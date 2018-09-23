import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { orderRoutes, userRoutes, adminRoutes } from "./server/routes";

const app = express();
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use(orderRoutes);
app.use(userRoutes);
app.use(adminRoutes);

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to Fast-Food-Fast A.K.A 'f-cube', Andela 21 Level-Up Project"});
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
	console.log(`Listening On Port ${port}`);
});

export default app;
