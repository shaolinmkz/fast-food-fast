import { db } from "./db";
import bcrypt from "bcrypt";

let password = "asdfilkj";
let logged_in = "false";
const hash = bcrypt.hashSync(password, 10);


export const polulateDB = (req, res) => {
	db.tx(t => {
		// this.ctx = transaction config + state context;
		return t.batch([
			t.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["rice and beans", "600"]),
			t.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["citizens meal", "1350"]),
			t.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["naija 58 meal", "1200"]),
			t.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["chief burger", "1050"]),
			t.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["rotisserie chicken", "3900"]),
			t.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["spicy crunchy chicken", "500"]),
			t.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["pot lovers menu", "5900"]),
			t.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["wrapstar meal", "1500"]),
			t.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["eva mineral water 75cl", "250"]),
			t.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["five alive pulpy orange 40cl", "400"]),
			t.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["coca cola 50cl", "300"]),
			t.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["coca cola zero 50cl", "300"]),
			t.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["fanta orange 50cl", "300"]),
			t.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["five alive 1L", "600"]),
			t.none("INSERT INTO users (fullname, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5)", ["Chris, Femi", "chrisfemi@yahoo.com", "08054325678", hash, logged_in]),
			t.none("INSERT INTO users (fullname, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5)", ["Jumoke, Coleson", "jumokecoleson@gmail.com", "07097215678", hash, logged_in]),
			t.none("INSERT INTO users (fullname, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5)", ["Ovie, Musa", "oviemusa@hotmail.com", "09062736478", hash, logged_in]),
			t.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Chris, Femi", "phemi", "chrisfemi@yahoo.com", "08054325678", hash, logged_in]),
			t.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Jumoke, Coleson", "cole", "jumokecoleson@gmail.com", "07097215678", hash, logged_in]),
			t.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Ovie, Musa", "musa", "oviemusa@hotmail.com", "09062736478", hash, logged_in]),
		]);
	});
	// success;
	return res.status(201).json({
		status: "success",
		message: "DATABASE SUCCESSFULLY POPULATED"
	});
};


