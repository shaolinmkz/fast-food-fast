import app from "../server.js";
import supertest from "supertest";
const { expect } = require("chai");

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
				expect(res.body.message).to.eql("firstname field is not defined");
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
				expect(res.body.message).to.eql("lastname field is not defined");
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
				expect(res.body.message).to.eql("email field is not defined");
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
				expect(res.body.message).to.eql("phone field is not defined");
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
				expect(res.body.message).to.eql("addressNo field is not defined");
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
				expect(res.body.message).to.eql("address field is not defined");
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
				expect(res.body.message).to.eql("lga field is not defined");
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
				expect(res.body.message).to.eql("state field is not defined");
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
				expect(res.body.message).to.eql("foods field is not defined");
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
				expect(res.body.message).to.eql("drinks field is not defined");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if firstname is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: 2
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 2. Should be a string data type");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if lastname is not a string", (done) => {
		request.post("/api/v1/orders")
			.send({
				firstname: true
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input true. Should be a string data type");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if mobile number is not a string or number", (done) => {
		request.post("/api/v1/orders")
			.send({
				phone: false
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("phone field is not defined");
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
				addressNo: true
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
				foods: false
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
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
				phone: 2347067443245,
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

	it("should return status 404 if URI is wrong", (done) => {
		request
			.get("/api/v1/order")
			.expect(404)
			.end((err, res) => {
				expect(res.status).to.eql(404);
				if (err) { return done(err); }
				done();
			});
	});

	it("should return all questions in JSON format", (done) => {
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

	it("should return all questions in JSON format", (done) => {
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
