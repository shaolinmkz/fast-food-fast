import { foodsDB, drinksDB } from "../server/dummyDB";
import app from "../server";
import supertest from "supertest";
const { expect, assert } = require("chai");

const request = supertest.agent(app);

//Test for place an order
describe("Place an order route", () => {

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

	it("should return 400 if foods is not a string or Array", (done) => {
		request.post("/api/v1/orders")
			.send({
				userId: 2,
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: true,
				foodsQuantity: [1, 3],
				drinks: ["coca cola 50cl", "five alive 1L"],
				drinksQuantity: [4, 2]
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
				userId: 3,
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: ["chief burger", "rotisserie chicken"],
				foodsQuantity : [1, 3],
				drinks: ["coca cola 50cl", "five alive 1L"],
				drinksQuantity: [4, 2]
			})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("Order has been placed successfully");
				if (err) { return done(err); }
				done();
			});
	});

	it("should convert strings to array for foods and drinks", (done) => {
		request.post("/api/v1/orders")
			.send({
				userId: 1,
				addressNo: 23,
				address: "xyz road behind maggi cube",
				lga: "lagos Island",
				state: "lagos state",
				foods: "chief burger, rotisserie chicken",
				foodsQuantity: [1, 3],
				drinks: "coca cola 50cl, five alive 1L",
				drinksQuantity: [1, 2]
			})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				if (err) { return done(err); }
				done();
			});
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
				expect(res.body.message).to.eql("All orders received successfully");
				if (err) { return done(err); }
				done();
			});
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
				expect(res.body.message).to.eql("Order received successfully");
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
