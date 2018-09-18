import { foodsDB, drinksDB } from "../server/dummyDB";
import app from "../server";
import supertest from "supertest";
const { expect, assert } = require("chai");

const request = supertest.agent(app);

//Test for place an order
describe("Place an order route", () => {
	it("should return 400 if firstname field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});
	it("should return 400 if lastname field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				lastname: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if email field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				email: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if phone field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				phone: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if addressNo field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				addressNo: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if address field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				address: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if lga field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				lga: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if state field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				state: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if foods field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				foods: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if drinks field is undefined", (done) => {
		request.post("/api/v1/orders")
			.send({
				drinks: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("One or more input fields are empty or has invalid input");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if firstname is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: 24,
				lastname: "Doe",
				email: "janedoe@testmail.com",
				phone: 2347067443245,
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: ["chief burger", "rotisserie chicken"],
				drinks: ["coca cola 50cl", "five alive 1L"]
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 24. Should be a string data type");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if lastname is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: "Jane",
				lastname: 9456,
				email: "janedoe@testmail.com",
				phone: 2347067443245,
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: ["chief burger", "rotisserie chicken"],
				drinks: ["coca cola 50cl", "five alive 1L"]
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 9456. Should be a string data type");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if phone is not a string or number", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: "Jane",
				lastname: "Doe",
				email: "janedoe@testmail.com",
				phone: [2347067443245],
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: ["chief burger", "rotisserie chicken"],
				drinks: ["coca cola 50cl", "five alive 1L"]
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 2347067443245. Should be a number data type");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if email is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				email: 2131
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if addressNo is not a number", (done) => {
		request.post("/api/v1/orders")
			.send({
				addressNo: false
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if address is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				address: 12
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if lga is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				lga: true
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if state is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				state: 2
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if foods is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: "Jane",
				lastname: "Doe",
				email: "janedoe@testmail.com",
				phone: 2347067443245,
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: true,
				drinks: ["coca cola 50cl", "five alive 1L"]
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input true. Should be an Array object or a string data type");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if drinks is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				drinks: 9123
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 201 if all inputs passes validation", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: "Jane",
				lastname: "Doe",
				email: "janedoe@testmail.com",
				phone: "07067443333",
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: ["chief burger", "rotisserie chicken"],
				drinks: ["coca cola 50cl", "five alive 1L"]
			})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("Order has been placed successfully");
				expect(res.body.orderDetails.shippingdetails.phone).to.eql(2347067443333);
				if (err) { return done(err); }
				done();
			});
	});

	it("should convert strings to array for foods and drinks", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: "Jane",
				lastname: "Doe",
				email: "janedoe@testmail.com",
				phone: 7067443333,
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: "chief burger, rotisserie chicken",
				drinks: "coca cola 50cl, five alive 1L",
			})
			.end((err, res) => {
				expect(res.body.orderDetails.items.drinks).to.be.a("array");
				expect(res.body.orderDetails.items.foods).to.be.a("array");
				expect(res.body.orderDetails.items.drinks).to.eql(["coca cola 50cl", " five alive 1L"]);
				expect(res.body.orderDetails.shippingdetails.phone).to.eql(2347067443333);
				if (err) { return done(err); }
				done();
			});
	});

	it("should convert strings to array for foods and drinks", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: "Jane",
				lastname: "Doe",
				email: "janedoe@testmail.com",
				phone: 2347067443245,
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: "chief burger, pot lovers, rotisserie chicken, crunchy chicken",
				drinks: "coca cola 50cl, five alive 1L, coca-cola zero 50cl",
			})
			.end((err, res) => {
				expect(res.body.orderDetails.bill.subtotal).to.be.a("string");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return the created order in JSON format", (done) => {
		request.post("/api/v1/orders")
			.expect("content-type", /json/)
			.end(done);
	});
});

//Test to get all orders

describe("GET all orders endpoint", () => {

	it("should return status 200 if URI is correct", (done) => {
		request
			.get("/api/v1/orders")
			.expect(200)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("All pending orders delivered successfully");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return all orders in JSON format", (done) => {
		request.get("/api/v1/orders")
			.expect("content-type", /json/)
			.end(done);
	});
});


//Test to get an order
describe("GET an order endpoint", () => {

	it("should return status 200 if URI exists", (done) => {
		request
			.get("/api/v1/orders/2")
			.expect(200)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("Order delivered successfully");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return status 404 if URI exists", (done) => {
		request
			.get("/api/v1/orders/100")
			.expect(404)
			.end((err, res) => {
				expect(res.status).to.eql(404);
				expect(res.body.message).to.eql("That resource isn't available");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return all orders in JSON format", (done) => {
		request.get("/api/v1/orders/1")
			.expect("content-type", /json/)
			.end(done);
	});
});


//Update order status url
describe("Update order status endpoint", () => {

	it("should return 201 if updated", (done) => {
		request.put("/api/v1/orders/2")
			.send({
				status: "decline"
			})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("Status has been updated");
				expect(res.body.output.status).to.eql("decline");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 404 if resource isn't found", (done) => {
		request.put("/api/v1/orders/100")
			.send({
				status: "accepted"
			})
			.end((err, res) => {
				expect(res.status).to.eql(404);
				expect(res.body.message).to.eql("That resource isn't available");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if status is not a string data type", (done) => {
		request.put("/api/v1/orders/1")
			.send({
				status: true
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input true. Should be a string data type");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return the created order in JSON format", (done) => {
		request.put("/api/v1/orders/3")
			.expect("content-type", /json/)
			.end(done);
	});
});

//Test to get all food menus
describe("GET all food end point", () => {

	it("should return status 200 if URI exists", (done) => {
		request
			.get("/api/v1/orders/menus/foods")
			.expect(200)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(foodsDB).to.have.lengthOf(foodsDB.length);
				assert.property(foodsDB[3], "price");
				expect(res.body.message).to.eql("All meals have been delivered successfully");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return all food menus in JSON format", (done) => {
		request.get("/api/v1/orders/menus/foods")
			.expect("content-type", /json/)
			.end(done);
	});
});

//Test to get all drinks menus
describe("GET all drinks end point", () => {

	it("should return status 200 if URI exists", (done) => {
		request
			.get("/api/v1/orders/menus/drinks")
			.expect(200)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(drinksDB).to.have.lengthOf(drinksDB.length);
				assert.lengthOf(drinksDB, drinksDB.length);
				assert.property(drinksDB[0], "name");
				expect(res.body.message).to.eql("All drinks have been delivered successfully");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return all food menus in JSON format", (done) => {
		request.get("/api/v1/orders/menus/drinks")
			.expect("content-type", /json/)
			.end(done);
	});
});

//Test to get a specific food
describe("GET a food endpoint", () => {

	it("should return status 200 if URI exists", (done) => {
		request
			.get("/api/v1/orders/menus/foods/2")
			.expect(200)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(foodsDB).to.have.lengthOf(foodsDB.length);
				assert.lengthOf(foodsDB, foodsDB.length);
				assert.property(foodsDB[0], "name");
				expect(res.body.message).to.eql("Food menu delivered successfully");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return status 404 if resource doesn't exists", (done) => {
		request
			.get("/api/v1/orders/menus/foods/100")
			.expect(404)
			.end((err, res) => {
				expect(res.status).to.eql(404);
				expect(res.body.message).to.eql("That food menu isn't available");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return food in JSON format", (done) => {
		request.get("/api/v1/orders/menus/foods/4")
			.expect("content-type", /json/)
			.end(done);
	});
});

//Test to get a specific drink
describe("GET a drink endpoint", () => {

	it("should return status 200 if URI exists", (done) => {
		request
			.get("/api/v1/orders/menus/drinks/1")
			.expect(200)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(drinksDB).to.have.lengthOf(drinksDB.length);
				assert.lengthOf(drinksDB, drinksDB.length);
				assert.property(drinksDB[0], "name");
				expect(res.body.message).to.eql("Drink menu delivered successfully");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return status 404 if resource doesn't exists", (done) => {
		request
			.get("/api/v1/orders/menus/drinks/500")
			.expect(404)
			.end((err, res) => {
				expect(res.status).to.eql(404);
				expect(res.body.message).to.eql("That drink menu isn't available");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return drink in JSON format", (done) => {
		request.get("/api/v1/orders/menus/drinks/1")
			.expect("content-type", /json/)
			.end(done);
	});
});

//Test if root api route is accessed
describe("The root of the api route", () => {

	it("should return status 200", (done) => {
		request
			.get("/")
			.expect(200)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("Welcome to Fast-Food-Fast A.K.A 'f-cube', Andela 21 Level-Up Project");
				if (err) { return done(err); }
				done();
			});
	});
});
