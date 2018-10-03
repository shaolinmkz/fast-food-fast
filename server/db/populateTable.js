import { db } from "./db";
import bcrypt from "bcryptjs";

let password = "asdfilkj";
let logged_in = "false";
const hash = bcrypt.hashSync(password, 10);


export const polulateDB = (req, res) => {
	db.tx(t => {
		// this.ctx = transaction config + state context;
		return t.batch([
			t.none("INSERT INTO foods (name, price, image) VALUES ($1, $2, $3)", ["rice and beans", "600", "./images/fd1.jpg"]),
      t.none("INSERT INTO foods (name, price, image) VALUES ($1, $2, $3)", ["citizens meal", "1350", "./images/fd2.png"]),
			t.none("INSERT INTO foods (name, price, image) VALUES ($1, $2, $3)", ["naija 58 meal", "1200", "./images/fd3.png"]),
			t.none("INSERT INTO foods (name, price, image) VALUES ($1, $2, $3)", ["chief burger", "1050", "./images/fd4.jpg"]),
			t.none("INSERT INTO foods (name, price, image) VALUES ($1, $2, $3)", ["rotisserie chicken", "3900", "./images/fd5.jpg"]),
      t.none("INSERT INTO foods (name, price, image) VALUES ($1, $2, $3)", ["spicy crunchy chicken", "500", "./images/fd6.jpg"]),
			t.none("INSERT INTO foods (name, price, image) VALUES ($1, $2, $3)", ["pot lovers menu", "5900", "./images/fd7.jpg"]),
			t.none("INSERT INTO foods (name, price, image) VALUES ($1, $2, $3)", ["wrapstar meal", "1500", "./images/fd8.jpg"]),
      t.none("INSERT INTO drinks (name, price, image) VALUES ($1, $2, $3)", ["eva mineral water 75cl", "250", "./images/drinks1.jpg"]),
			t.none("INSERT INTO drinks (name, price, image) VALUES ($1, $2, $3)", ["five alive pulpy orange 40cl", "400", "./images/drinks2.jpg"]),
			t.none("INSERT INTO drinks (name, price, image) VALUES ($1, $2, $3)", ["coca cola 50cl", "300", "./images/drinks3.jpg"]),
			t.none("INSERT INTO drinks (name, price, image) VALUES ($1, $2, $3)", ["coca cola zero 50cl", "300", "./images/drinks4.jpg"]),
			t.none("INSERT INTO drinks (name, price, image) VALUES ($1, $2, $3)", ["fanta orange 50cl", "300", "./images/drinks5.jpg"]),
			t.none("INSERT INTO drinks (name, price, image) VALUES ($1, $2, $3)", ["five alive 1L", "600", "./images/drinks6.jpg"]),
			t.none("INSERT INTO users (fullname, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5)", ["Chris, Femi", "chrisfemi@yahoo.com", "08054325678", hash, logged_in]),
			t.none("INSERT INTO users (fullname, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5)", ["Jumoke, Coleson", "jumokecoleson@gmail.com", "07097215678", hash, logged_in]),
      t.none("INSERT INTO users (fullname, email, phone, address, lga, state, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", ["Ovie, Musa", "oviemusa@hotmail.com", "09062736478", "ABC building beside genesis deluxe", "Apapa", "Lagos", hash, logged_in]),
			t.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Chris, Femi", "phemi", "chrisfemi@yahoo.com", "08054325678", hash, logged_in]),
			t.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Jumoke, Coleson", "cole", "jumokecoleson@gmail.com", "07097215678", hash, logged_in]),
			t.none("INSERT INTO admins (fullname, username, email, phone, password, logged_in) VALUES ($1, $2, $3, $4, $5, $6)", ["Ovie, Musa", "musa", "oviemusa@hotmail.com", "09062736478", hash, logged_in]),
			t.none("INSERT INTO orders (food_items, food_quantities, drink_items, drink_quantities, subtotal, delivery, discount, total, status, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ["citizens meal,pot lovers menu", "3,2", "five alive 1L","2", "8350", "250", "350", "7250", "CANCELLED", 1]),
			t.none("INSERT INTO orders (food_items, food_quantities, drink_items, drink_quantities, subtotal, delivery, discount, total, status, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ["pot lovers menu", "3,2", "five alive 1L", "1", "6250", "250", "100", "6400", "COMPLETE", 1]),
		]);
	});
	// success;
	return res.status(201).json({
		status: "success",
		message: "DATABASE SUCCESSFULLY POPULATED"
	});
};


