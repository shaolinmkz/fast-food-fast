import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { orderRoutes } from "./server/routes";

const app = express();
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use(orderRoutes);

app.get("/", function (req, res) {
    res.status(200).send(
        "Welcome to Fast-Food-Fast {F-cube}, Andela 21 Level-Up Project")
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export default app;