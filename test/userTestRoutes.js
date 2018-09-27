import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);

/**
 * signup User
 */
describe("SignUp users route", () => {


	it("should return 400 if all fields are empty", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067443245",
				password: "zxcvbn74824",
				confirmPassword: "dhja7c"
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

	it("should return 400 if all fields are empty", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067443245",
				password: "1234",
				confirmPassword: "1234"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Password length must be greater than 6");
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


	it("should return 400 if all fields are empty", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: " ",
				lastname: " ",
				email: " ",
				phone: " ",
				password: false,
				confirmPassword: false
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
				done();
			});
	});

	it("should return 400 if all fields are not string except phone", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: 1323123,
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: 7067443245,
				password: "asdfghj",
				confirmPassword: "asdfghj"
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
				done();
			});
	});

	it("should return 400 email is invalid", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabu zor.obi ora@gmailcom",
				phone: 7067443245,
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("The email nwabu zor.obi ora@gmailcom is invalid");
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

	it("should return 400 if firstname has an invalid character", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "E>e8ka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067443245",
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input E>e8ka. All characters must be alphabets");
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


	it("should return 400 if lastname has an invalid character", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora8",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067443245",
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input Obiora8. All characters must be alphabets");
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


	it("should return 400 if phone number has spaces", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067 43245",
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 07067 43245. Spaces are not required");
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


	it("should return 400 if phone number is not a Number", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: "0Z067P43245",
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid input 0Z067P43245. All characters must be numbers");
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

	it("should return 400 if lastname has an invalid character", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067423434243444325345435443245",
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid phone number length 07067423434243444325345435443245. It should be 11 digits");
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


	it("should return 201 if user details are correct", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067443245",
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(201);
				expect(res.body.message).to.eql("User created Successfully, Welcome Obiora, Emeka to f-cube");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(7);
				expect(res.body).to.have.property("status").with.lengthOf(7);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if user names has a length less than 2", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "a",
				lastname: "b",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067443245",
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("A vaild name starts with at least 2 characters");
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


	it("should return 409 if user exists", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmail.com",
				phone: "07067443245",
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(409);
				expect(res.body.message).to.eql("User already exists");
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
   * USER LOGIN TEST
   */
describe("Signin Users route", () => {

	it("should return 400 if login inputs are not strings", (done) => {
		request.post("/api/v2/auth/login")
			.send({
				email: 5567567,
				password: 656567575
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Email and Passord must be a string datatype");
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

	it("should return 400 if INPUTS ARE NOT DEFINED", (done) => {
		request.post("/api/v2/auth/login")
			.send({
				email: "",
				password: ""
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("email or password is not defined");
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


	it("should return 200 when user signs out", (done) => {
		request.post("/api/v2/logout")
			.send({
				email: "nwabuzor.obiora@gmail.com",
				password: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("User Logged out Successfully");
				expect(res.body.tokenMessage).to.eql("Token Expired");
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


	it("should return 400 if password isn't same with the hashed password", (done) => {
		request.post("/api/v2/auth/login")
			.send({
				email: "nwabuzor.obiora@gmail.com",
				password: "asdfgh"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("wrong password, please check and try again");
				expect(res.body.message).to.be.a("string");
				expect(res.body.status).to.have.lengthOf(5);
				expect(res.body).to.have.property("status").with.lengthOf(5);
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if user isn't found during login", (done) => {
		request.post("/api/v2/auth/login")
			.send({
				email: "Zwabuzor.obiora@gmail.com",
				password: "asdfgh"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("User doesn't exist, create user!");
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

	it("should return 200 if all inputs are defined", (done) => {
		request.post("/api/v2/auth/login")
			.send({
				email: "nwabuzor.obiora@gmail.com",
				password: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("User logged in successfully, Welcome Obiora, Emeka");
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
   * LOGOUT USER
   */
describe("Signout Users route", () => {

	it("should return 200 when user signs out", (done) => {
		request.post("/api/v2/logout")
			.send({
				email: "nwabuzor.obiora@gmail.com",
				password: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("User Logged out Successfully");
				expect(res.body.tokenMessage).to.eql("Token Expired");
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

	it("should return 400 if user email isn't found ", (done) => {
		request.post("/api/v2/logout")
			.send({
				email: "Mwabuzor.obiora@gmail.com",
				password: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid User!");
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
 * GET ALL MENUS
 */
describe("Fetch all menu route", () => {

	it("should return 200 if all menus exist", (done) => {
		request.get("/api/v2/menu")
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("All menus received successfully");
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
