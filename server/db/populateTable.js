import { db } from "../db";
import bcrypt from "bcrypt";

let password = "asdfilkj";
let logged_in = "false";
const hash = bcrypt.hashSync(password, 10);

export const insertUsers = (req, res, next) => {
	db.none("INSERT INTO users (fullname, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5)", ["Chris, Femi", "chrisfemi@yahoo.com", "08054325678", hash, logged_in])
		.then(() => {
			db.none("INSERT INTO users (fullname, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5)", ["Jumoke, Coleson", "jumokecoleson@gmail.com", "07097215678", hash, logged_in])
				.then(() => {
					db.none("INSERT INTO users (fullname, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5)", ["Ovie, Musa", "oviemusa@hotmail.com", "09062736478", hash, logged_in])
						.then(() => {
							next();
						});
				});
		});
};

export const insertAdmins = (req, res, next) => {
	db.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Chris, Femi", "phemi", "chrisfemi@yahoo.com", "08054325678", hash, logged_in])
		.then(() => {
			db.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Jumoke, Coleson", "cole", "jumokecoleson@gmail.com", "07097215678", hash, logged_in])
				.then(() => {
					db.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Ovie, Musa", "musa", "oviemusa@hotmail.com", "09062736478", hash, logged_in])
						.then(() => {
							next();
						});
				});
		}).catch(() => {
			return res.status(409).json({
				status: "Error",
				message: "This resource Already Exist"
			});
		});
};


