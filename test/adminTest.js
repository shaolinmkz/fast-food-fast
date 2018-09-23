import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);

/**
 * Create Admin
 */
describe("Admin signUp route", () => {

	it("should return 400 if all fields are empty", (done) => {
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



});