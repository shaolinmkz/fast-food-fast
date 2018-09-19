import { db } from "../db";
import bcrypt from "bcrypt";

export const createNewUsers = (req, res) => {
	const {
		firstname,
		lastname,
		email,
		phone,
		password } = req.body;
	const reqArr = [ firstname, lastname, email, phone, password ];
	for (let i in reqArr) {
		if (!reqArr[i]) {
			return res.status(400).json({
				status: "Error",
				message: "Empty or invalid input entered",
			});
		}
		if (/@yahoo.com/.test(email) || /@gmail.com/.test(email) || /@hotmail.com/.test(email)) {
			return res.status(400).json({
				status: "Error",
				message: "Empty or invalid input entered",
			});
		}
	}

	const fullname = `${lastname}, ${firstname}`;

	const hash = bcrypt.hashSync(password, 10);

	db.none("INSERT INTO users(username, firstName, lastName, email, password)" +
    "VALUES ($1, $2, $3, $4, $5) returning *", [fullname, email, phone, hash])
		.then(() => {
			return res.status(201)
				.json({
					status: "Success",
					message: "User Created"
				});
		})
		.catch(function (err) {
			return console.log("Error:", err);
		});
};