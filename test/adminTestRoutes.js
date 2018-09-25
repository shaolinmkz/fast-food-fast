import app from "../server";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);

dotenv.load();


/**
 * Generate token
 */

const tokenHeaderAdmin = id => jwt.sign(
	{ user: { id, username: "mustapha" } },
	process.env.ADMIN_ONLY, { expiresIn: 24 * 60 * 60 }
).toString();

const invalidtoken = id => jwt.sign(
	{ user: { id, username: "invalidname" } },
	"invalidtoken", { expiresIn: 24 * 60 * 60 }
).toString();


/**
 * Create Admin
 */
describe("Admin signUp route", () => {

	it("should return 400 if password doesn't match", (done) => {
		request.post("/api/v2/auth/admin/signup")
			.send({
				username: "shaolinmkz",
				firstname: "Emekus",
				lastname: "Nwabuzor",
				email: "nwabuzor.emmy@gmail.com",
				phone: "08067443299",
				adminToken: process.env.ADMIN_TOKEN,
				password: "asdfghjkl",
				confirmPassword: "asdfg"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Password didn't match");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if username field is undefined", (done) => {
		request.post("/api/v2/auth/admin/signup")
			.send({
				username: null,
				firstname: "Emekus",
				lastname: "Nwabuzor",
				email: "nwabuzor.emmy@gmail.com",
				phone: "08067443299",
				adminToken: process.env.ADMIN_TOKEN,
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Required field empty");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if username field is not a string", (done) => {
		request.post("/api/v2/auth/admin/signup")
			.send({
				username: 1233312,
				firstname: "Emekus",
				lastname: "Nwabuzor",
				email: "nwabuzor.emmy@gmail.com",
				phone: "08067443299",
				adminToken: process.env.ADMIN_TOKEN,
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid data type number. It should be a String data type");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if username length is less than 4", (done) => {
		request.post("/api/v2/auth/admin/signup")
			.send({
				username: "mkz",
				firstname: "Emekus",
				lastname: "Nwabuzor",
				email: "nwabuzor.emmy@gmail.com",
				phone: "08067443299",
				adminToken: process.env.ADMIN_TOKEN,
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("A username must be 4 characters and above");
				expect(res.body.example).to.eql("Tony is acceptable NOT Ton OR Ony");
				expect(res.body.example).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 201 if all details are entered correctly", (done) => {
		request.post("/api/v2/auth/admin/signup")
			.send({
				username: "shaolin007",
				firstname: "Emekus",
				lastname: "Nwabuzor",
				email: "nwabuzor.shoalin@gmail.com",
				phone: "08067443298",
				adminToken: process.env.ADMIN_TOKEN,
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("Admin created Successfully, Welcome Admin shaolin007");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 409 if admin exists", (done) => {
		request.post("/api/v2/auth/admin/signup")
			.send({
				username: "shaolin007",
				firstname: "Emekus",
				lastname: "Nwabuzor",
				email: "nwabuzor.shoalin@gmail.com",
				phone: "08067443298",
				adminToken: process.env.ADMIN_TOKEN,
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(409);
				expect(res.body.message).to.eql("Admin already exists");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if super admins token is wrong", (done) => {
		request.post("/api/v2/auth/admin/signup")
			.send({
				username: "shaolin",
				firstname: "Emekus",
				lastname: "Nwabuzor",
				email: "nwabuzor.shoalinmkz@gmail.com",
				phone: "09067443298",
				adminToken: "hgs123123gk2312hghad",
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid token, check and try again");
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




/**
 * Login Admin
 */
describe("Admin Login route", () => {

	it("should return 400 if username is null", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: null,
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("username or password is not defined");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 400 if password is null", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: "shaolinmkz",
				password: null
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("username or password is not defined");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if password is not a string", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: "Babatunde",
				password: false
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("username or password is not defined");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 400 if username is not a string", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: false,
				password: "rtitrrrurorp"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("username or password is not defined");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if username is not a string", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: 576565675,
				password: 4343433634
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("username and Passord must be a string datatype");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if username is not a string", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: "stringisgood",
				password: 4343433634
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("username and Passord must be a string datatype");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 400 if username is not found in the database", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: "shaolin009",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Admin doesn't exist, create admin!");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 200 if admin logs out", (done) => {
		request.post("/api/v2/admin/logout")
			.send({
				username: "shaolin007",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("Admin Logged out Successfully");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				(res.body.tokenMessage).should.equal("Token Expired");
				(res.body.logged_in).should.equal("false");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if password is wrong", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: "shaolin007",
				password: "asdfghjk"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("wrong password, please check and try again");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 200 if user logs in successfully", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: "shaolin007",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("Admin shaolin007 Logged in successfully");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if admin is logged in already", (done) => {
		request.post("/api/v2/auth/admin/login")
			.send({
				username: "shaolin007",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Admin is logged in already!");
				expect(res.body.message).to.be.a("string");
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



/**
 * Get all admins
 */
describe("Fetch all admins", () => {
	it("should return 200 if all admins are returned", (done) => {
		request.get("/api/v2/admins")
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("All admins received successfully");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});
});



/**
 * Logout Admin
 */
describe("Logout Admin", () => {

	it("should return 400 if admin logs out with invalid credentials", (done) => {
		request.post("/api/v2/admin/logout")
			.send({
				username: "shaolin00000",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid admin!");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 200 if admin logs out", (done) => {
		request.post("/api/v2/admin/logout")
			.send({
				username: "shaolin007",
				password: "asdfghjkl"
			})
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("Admin Logged out Successfully");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				(res.body.tokenMessage).should.equal("Token Expired");
				(res.body.logged_in).should.equal("false");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

});


/**
 * Add a meal by Admin
 */
describe("Add a menu by Admin", () => {

	it("should return 400 if field is a boolean false", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Connection", "keep alive")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: " ",
				price: "1000"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Required field empty");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if name has numbers", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: "Ric332e",
				price: 1222
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input Ric332e. All characters must be alphabets");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if length of name is less than 2", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: "e",
				price: "1000"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("A vaild product_name starts with at least 2 characters");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if spaces are included in the price", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: "banana",
				price: "1 0 0 0"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 1 0 0 0. Spaces are not required");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if the price is not a valid number", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: "banana",
				price: "1E00Q0"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 1E00Q0. All characters must be numbers");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 403 if all is validated correctly", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Accept", "application/json")
			.set("authorization", invalidtoken(20))
			.set("Content-Type", "application/json")
			.send({
				name: "waffles",
				price: "2700"
			})
			.end((err, res) => {
				expect(res.status).to.eql(401);
				expect(res.body.message).to.eql("Invalid Token");
				expect(res.body.message).to.be.a("string");
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 403 if all is validated correctly", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Accept", "application/json")
			.set("authorization", " ")
			.set("Content-Type", "application/json")
			.send({
				name: "waffles",
				price: "2700"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Token not provided");
				expect(res.body.message).to.be.a("string");
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 201 if all is validated correctly", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: "waffles",
				price: "2700"
			})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("Food created Successfully");
				expect(res.body.message).to.be.a("string");
				expect(res.body).to.have.property("status").with.lengthOf(7);
				(res.body.status).should.equal("Success");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 409 if food exists", (done) => {
		request.post("/api/v2/admin/menu/foods")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: "waffles",
				price: "2700"
			})
			.end((err, res) => {
				expect(res.status).to.eql(409);
				expect(res.body.message).to.eql("Food already exists, choose a different name");
				expect(res.body.message).to.be.a("string");
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 201 if all drinks field is valid", (done) => {
		request.post("/api/v2/admin/menu/drinks")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: "blue cocktail",
				price: "3500"
			})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("Drink created Successfully");
				expect(res.body.message).to.be.a("string");
				expect(res.body).to.have.property("status").with.lengthOf(7);
				(res.body.status).should.equal("Success");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 409 if drink already exist", (done) => {
		request.post("/api/v2/admin/menu/drinks")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({
				name: "blue cocktail",
				price: "3500"
			})
			.end((err, res) => {
				expect(res.status).to.eql(409);
				expect(res.body.message).to.eql("Drink already exists, choose a different name");
				expect(res.body.message).to.be.a("string");
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


});


describe("Add a menu by Admin", () => {

	it("should return 201 if all test menus are inserted", (done) => {
		request.post("/api/v2/admin/push")
			.set("Connection", "keep alive")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("ALL MENU INSERTED");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				(res.body.status).should.equal("success");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 409 menu already exist", (done) => {
		request.post("/api/v2/admin/push")
			.set("Connection", "keep alive")
			.set("Accept", "application/json")
			.set("authorization", tokenHeaderAdmin(1))
			.set("Content-Type", "application/json")
			.send({})
			.end((err, res) => {
				expect(res.status).to.eql(409);
				expect(res.body.message).to.eql("Menu Already Exist");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				(res.body.status).should.equal("Error");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



});





