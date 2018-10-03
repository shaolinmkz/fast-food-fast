import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import logger from "morgan";
import swaggerUI from "swagger-ui-express";

import swaggerDocs from "./swaggerDocs.json";
import { orderRoutes, userRoutes, adminRoutes } from "./server/routes";

const port = process.env.PORT || 7000;

const app = express();
// Enable request logs on the console
app.use(logger("dev"));

// Enable All CORS Requests
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

// Serve api docs
app.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(orderRoutes);
app.use(userRoutes);
app.use(adminRoutes);

// Enable CORS from client-side
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:7000", "http://127.0.0.1:5500", "https://f-cube.herokuapp.com", "*");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, " +
    "Authorization, Access-Control-Allow-Credentials"
	);
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

// Link to webpages
app.use(express.static(path.join(__dirname, "ui")));

app.get("/", (req, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "ui", "index.html")
	);
});

app.get("/home", (req, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "ui", "home.html")
	);
});

app.get("/about", (req, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "ui", "about_us.html")
	);
});

app.get("/products", (req, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "ui", "products.html")
	);
});

app.get("/history", (req, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "ui", "history.html")
	);
});

app.get("/dashboard", (req, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "ui", "admin_dashboard.html")
	);
});

app.get("/admin", (req, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "ui", "admin.html")
	);
});

app.get("/placeorder", (req, res) => {
	res.status(200).sendFile(
		path.join(__dirname, "ui", "placeorder.html")
	);
});

app.get("/addmenu", (req, res) => {
  res.status(200).sendFile(
    path.join(__dirname, "ui", "add_menu.html")
  );
});

app.get("*", (req, res) => {
	res.status(404).sendFile(
		path.join(__dirname, "ui", "404_errors.html")
	);
});

app.get("/*", (req, res) => {
	res.status(404).sendFile(
		path.join(__dirname, "ui", "404_errors.html")
	);
});

app.listen(port, () => {
	console.log(`Listening On Port ${port}`);
});

export default app;

