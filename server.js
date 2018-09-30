import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import swaggerDocs from "./swaggerDocs.json";
import swaggerUI from "swagger-ui-express";
import { orderRoutes, userRoutes, adminRoutes } from "./server/routes";

const app = express();
app.use(logger("dev"));

// Enable All CORS Requests
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(orderRoutes);
app.use(userRoutes);
app.use(adminRoutes);

// Enable CORS from client-side
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:7000", "http://127.0.0.1:5500", "https://f-cube.herokuapp.com");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, " +
    "Authorization, Access-Control-Allow-Credentials"
	);
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to Fast-Food-Fast A.K.A 'f-cube', Andela 21 Level-Up Project"});
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
	console.log(`Listening On Port ${port}`);
});

export default app;
