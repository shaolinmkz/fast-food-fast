import app from "../server";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

chai.use(chaiHttp);


dotenv.load();


let testToken, testToken2, testTokenB;

/**logins */
describe("User signup and activities", () => {

	before((done) => {
		chai.request(app)
			.post("/api/v2/auth/signup")
			.send({
				firstname: "musat",
				lastname: "musata",
				email: "musta.shoalin@yahoo.com",
				phone: "08067723298",
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((error, res) => {
				testToken = res.body.token;
				done();
			});

	});

	before((done) => {
		chai.request(app)
			.post("/api/v2/auth/signup")
			.send({
				firstname: "xxxxx",
				lastname: "yyyyy",
				email: "yyyyy.xxxxx@yahoo.com",
				phone: "08000723298",
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((error, res) => {
				testToken2 = res.body.token;
				done();
			});

	});

	before((done) => {
		chai.request(app)
			.post("/api/v2/auth/admin/signup")
			.send({
				username: "AdminTwo",
				firstname: "xxxxx",
				lastname: "yyyyy",
				email: "yzyyy.xxxxx@yahoo.com",
				phone: "08000023298",
				adminToken: process.env.ADMIN_TOKEN,
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((error, res) => {
				testTokenB = res.body.token;
				done();
			});

	});


	it("should return 400 if user is invalid", (done) => {
		chai.request(app)
			.post("/api/v2/logout")
			.send({
				email: "ppppp.pp@yahoo.com",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid User!");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 200 if user is loggout successfully", (done) => {
		chai.request(app)
			.post("/api/v2/logout")
			.send({
				email: "yyyyy.xxxxx@yahoo.com",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(200);
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 200 if logged in", (done) => {
		chai.request(app)
			.post("/api/v2/auth/login")
			.send({
				email: "yyyyy.xxxxx@yahoo.com",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(200);
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if user is already logged in", (done) => {
		chai.request(app)
			.post("/api/v2/auth/login")
			.send({
				email: "musta.shoalin@yahoo.com",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("User is already logged in");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 201 if user doesn't exists", (done) => {
		chai.request(app)
			.post("/api/v2/orders")
			.send({
				address: "XYZ building behinde genesis deluxe",
				lga: "Apapa",
				state: "Lagos",
				foods: ["citizens meal", "pot lovers menu"],
				foodsQuantity: [2, 1],
				drinks: ["five alive 1L", "fanta orange 50cl", "coca cola 50cl"],
				drinksQuantity: [1, 1, 3]
			})
			.set("authorization", testToken)
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("Your order has been placed");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 201 if user doesn't exists", (done) => {
		chai.request(app)
			.post("/api/v2/orders")
			.send({
				address: "XYZ building behinde genesis deluxe",
				lga: "Apapa",
				state: "Lagos",
				foods: ["citizens meal", "pot lovers menu"],
				foodsQuantity: [2, 1],
				drinks: ["five alive 1L", "fanta orange 50cl", "coca cola 50cl"],
				drinksQuantity: [1, 1, 3]
			})
			.set("x-access-token", testToken)
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("Your order has been placed");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if address is not  string", (done) => {
		chai.request(app)
			.post("/api/v2/orders")
			.send({
				address: "XYZ building behinde genesis deluxe",
				lga: "Apapa",
				state: "Lagos",
				foods: ["citizens meal", "pot lovers menu"],
				foodsQuantity: "2, 1",
				drinks: ["five alive 1L", "fanta orange 50cl", "coca cola 50cl"],
				drinksQuantity: [1, 1, 3]
			})
			.set("x-access-token", testToken)
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input data type 2, 1. Should be an Array");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if address is not  string", (done) => {
		chai.request(app)
			.post("/api/v2/orders")
			.send({
				address: "XYZ building behinde genesis deluxe",
				lga: "Apapa",
				state: "Lagos",
				foods: ["citizens meal", "pot lovers menu"],
				foodsQuantity: [2, "shsa"],
				drinks: ["five alive 1L", "fanta orange 50cl", "coca cola 50cl"],
				drinksQuantity: [1, 1, 3]
			})
			.set("x-access-token", testToken)
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input [2,shsa] ==> shsa. Should be a number data type");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 400 if address is not  string", (done) => {
		chai.request(app)
			.post("/api/v2/orders")
			.send({
				address: 3423434234,
				lga: "Apapa",
				state: "Lagos",
				foods: ["citizens meal", "pot lovers menu"],
				foodsQuantity: [2, 1],
				drinks: ["five alive 1L", "fanta orange 50cl", "coca cola 50cl"],
				drinksQuantity: [1, 1, 3]
			})
			.set("x-access-token", testToken)
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 3423434234. Should be a string data type");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 400 if user is not logged in and tries to place an order", (done) => {
		chai.request(app)
			.post("/api/v2/orders")
			.send({
				address: "XYZ building behinde genesis deluxe",
				lga: "Apapa",
				state: "Lagos",
				foods: ["citizens meal", "pot lovers menu"],
				foodsQuantity: [2, 1],
				drinks: ["five alive 1L", "fanta orange 50cl", "coca cola 50cl"],
				drinksQuantity: [1, 1, 3]
			})
			.set("x-access-token", process.env.invalidUserToken)
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("user doesn't exist or is not logged in");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 200 if order history exists", (done) => {
		chai.request(app)
			.get("/api/v2/users/5/orders")
			.set("x-access-token", testToken)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("All order history received successfully");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 404 if order history isn't found", (done) => {
		chai.request(app)
			.get("/api/v2/users/10000/orders")
			.set("x-access-token", testToken)
			.end((err, res) => {
				expect(res.status).to.eql(404);
				expect(res.body.message).to.eql("History not found");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if token is not provided", (done) => {
		chai.request(app)
			.post("/api/v2/orders")
			.send({
				address: "XYZ building behinde genesis deluxe",
				lga: "Apapa",
				state: "Lagos",
				foods: ["citizens meal", "pot lovers menu"],
				foodsQuantity: [2, 1],
				drinks: ["five alive 1L", "fanta orange 50cl", "coca cola 50cl"],
				drinksQuantity: [1, 1, 3]
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Token not provided");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 400 if token is invalid", (done) => {
		chai.request(app)
			.post("/api/v2/orders")
			.send({
				address: "XYZ building behinde genesis deluxe",
				lga: "Apapa",
				state: "Lagos",
				foods: ["citizens meal", "pot lovers menu"],
				foodsQuantity: [2, 1],
				drinks: ["five alive 1L", "fanta orange 50cl", "coca cola 50cl"],
				drinksQuantity: [1, 1, 3]
			})
			.set("authorization", "cucsdrrenasjklsjxtTokscden")
			.end((err, res) => {
				expect(res.status).to.eql(401);
				expect(res.body.message).to.eql("Invalid Token");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


});