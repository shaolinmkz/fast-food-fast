import app from "../server";
import supertest from "supertest";
const { expect, assert } = require("chai");

const request = supertest.agent(app);


//signup Validation
describe("SignUp Validation for users", () => {

	it("should return 400 if all fields are empty", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmailcom",
				phone: "07067443245",
				password: "zxcvbn74824",
				confirmPassword: "dhja7c"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Password didn't match");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if all fields are empty", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "Emeka",
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmailcom",
				phone: "07067443245",
				password: "1234",
				confirmPassword: "1234"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Password length must be greater than 6");
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
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if all fields are not string except phone", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: 1323123,
				lastname: "Obiora",
				email: "nwabuzor.obiora@gmailcom",
				phone: 7067443245,
				password: "asdfghj",
				confirmPassword: "asdfghj"
			})
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Invalid data type number. It should be a String data type");
				if (err) { return done(err); }
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
				if (err) { return done(err); }
				done();
			});
  });

  it("should return 400 if user doesn't exists", (done) => {
    request.post("/api/v2/auth/signup")
      .send({
        firstname: "NotEmeka",
        lastname: "Obiora",
        email: "nwabuzor.obiora@gmail.com",
        phone: "07067443245",
        password: "asdfghj",
        confirmPassword: "asdfghj"
      })
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.status).to.eql("Error");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 409 if user exists", (done) => {
    request.post("/api/v2/auth/login")
      .send({

        email: " ",
        phone: "07067443245"

      })
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql("email or password is not defined");
        if (err) { return done(err); }
        done();
      });
  });


});