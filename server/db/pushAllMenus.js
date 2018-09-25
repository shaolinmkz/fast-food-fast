import { db } from "./index";

export const insertFoods = (req, res, next) => {
	db.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["rice and beans", "600"])
		.then(() => {
			db.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["citizens meal", "1350"])
				.then(() => {
					db.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["naija 58 meal", "1200"])
						.then( () => {
							db.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["chief burger", "1050"])
								.then(() => {
									db.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["rotisserie chicken", "3900"])
										.then(() => {
											db.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["spicy crunchy chicken", "500"])
												.then(() => {
													db.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["pot lovers menu", "5900"])
														.then(() => {
															db.none("INSERT INTO foods (name, price) VALUES ($1, $2)", ["wrapstar meal", "1500"]);
															next();
														});
												});
										});
								});
						});
				});
		}).catch(() => { return res.status(409).json({ status: "Error", message: "Menu Already Exist" }); });
};

export const insertDrinks = (req, res) => {
	db.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["eva mineral water 75cl", "250"])
		.then(() => {
			db.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["five alive pulpy orange 40cl", "400"])
				.then(() => {
					db.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["coca cola 50cl", "300"])
						.then(() => {
							db.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["coca cola zero 50cl", "300"])
								.then(() => {
									db.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["fanta orange 50cl", "300"])
										.then(() => {
											db.none("INSERT INTO drinks (name, price) VALUES ($1, $2)", ["five alive 1L", "600"]);
											return res.status(201).json({
												status: "success",
												message: "DATABASE SUCCESSFULLY POPULATED"
											});
										});
								});
						});
				});
		});
};



