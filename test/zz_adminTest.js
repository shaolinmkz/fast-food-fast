import app from "../server";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

chai.use(chaiHttp);


dotenv.load();
const tokenHeaderAdmin = id => jwt.sign(
	{ user: { id, username: "musa" } },
	process.env.ADMIN_ONLY, { expiresIn: 24 * 60 * 60 }
).toString();

let testTokenB, testTokenC;
/**logins */
describe("Admin signup and other activities", () => {

	before((done) => {
		chai.request(app)
			.post("/api/v2/auth/admin/signup")
			.send({
				username: "AdminOne",
				firstname: "musat",
				lastname: "musata",
				email: "musta.shoralin@yahoo.com",
				phone: "08067832982",
				adminToken: process.env.ADMIN_TOKEN,
				password: "asdfghjkl",
				confirmPassword: "asdfghjkl"
			})
			.end((error, res) => {
				testTokenB = res.body.token;
				done();
			});

	});


	before((done) => {
		chai.request(app)
			.post("/api/v2/auth/admin/login")
			.send({
				username: "phemi",
				password: "asdfilkj"
			})
			.end((error, res) => {
				testTokenC = res.body.token;
				done();
			});

	});

	before((done) => {
		chai.request(app)
			.post("/api/v2/auth/admin/login")
			.send({
				username: "cole",
				password: "avdfilk"
			})
			.end((error) => {
				error;
				done();
			});

	});

	before((done) => {
		chai.request(app)
			.post("/api/v2/auth/admin/login")
			.send({
				username: "cole",
				password: "asdfilkj"
			})
			.end((error) => {
				error;
				done();
			});

	});

	before((done) => {
		chai.request(app)
			.post("/api/v2/admin/logout")
			.send({
				username: "cole",
				password: "asdfilkj"
			})
			.end(() => {
				done();
			});

	});

	before((done) => {
		chai.request(app)
			.post("/api/v2/admin/logout")
			.send({
				username: "wewrere",
				password: "asdfilkj"
			})
			.end(() => {
				done();
			});

	});




	it("should return 200 if a specific order is gotten", (done) => {
		chai.request(app)
			.get("/api/v2/orders/1")
			.set("authorization", testTokenC)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("Order received successfully");
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



	it("should return 404 if a spicific order is not found", (done) => {
		chai.request(app)
			.get("/api/v2/orders/100")
			.set("authorization", testTokenC)
			.end((err, res) => {
				expect(res.status).to.eql(404);
				expect(res.body.message).to.eql("order not found");
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

	it("should return 200 if all orders are gotten", (done) => {
		chai.request(app)
			.get("/api/v2/orders")
			.set("authorization", testTokenC)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("All orders received successfully");
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


	it("should return 200 if order is updated", (done) => {
		chai.request(app)
			.put("/api/v2/orders/1")
			.send({
				status: "COMPLETE"
			})
			.set("authorization", testTokenC)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.message).to.eql("Order status updated");
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


	it("should return 404 if order to be updated is NOT FOUND", (done) => {
		chai.request(app)
			.put("/api/v2/orders/1000")
			.send({
				status: "COMPLETE"
			})
			.set("authorization", testTokenC)
			.end((err, res) => {
				expect(res.status).to.eql(404);
				expect(res.body.message).to.eql("Order not found");
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

	it("should return 404 if order to be updated is NOT FOUND", (done) => {
		chai.request(app)
			.put("/api/v2/orders/1")
			.send({
				status: "COMPLETEDDD"
			})
			.set("authorization", testTokenC)
			.end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.message).to.eql("Should be either new, processing, cancelled or complete");
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



