[![Build Status](https://travis-ci.org/shaolinmkz/fast-food-fast.svg?branch=develop)](https://travis-ci.org/shaolinmkz/fast-food-fast) [![Maintainability](https://api.codeclimate.com/v1/badges/ea8f85b0311fcceebd51/maintainability)](https://codeclimate.com/github/shaolinmkz/fast-food-fast/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ea8f85b0311fcceebd51/test_coverage)](https://codeclimate.com/github/shaolinmkz/fast-food-fast/test_coverage)

# Fast-Food-Fast V2
Fast-Food-Fast​ is a food delivery service app for a restaurant where you can place your order and get your food as soon as possible.
It is written in Javascript(NodeJs for server), HTML and CSS. The app version has been upgraded to version 2 which is for production. The version 1 is for the dummy database using data structure. 
Thus for this purpose, use the v2 routes all through. The routes have been specified in the _Installation & Testing_ section.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites
* Have a text editor (vs-code, atom or sublime text) and
* Git-bash for windows
* Have a heroku account OR Postman

```
e.g
vs-code or sublime-text AND
Git Bash or CLI
```

### Installing

After cloning this repo, `cd` into it and on your command line run `npm install` to install the dependencies located in the `package.json` file.

```
e.g
User@guest MINGW64 ~
$ cd fast-food-fast
User@guest MINGW64 ~/fast-food-fast
$ npm install
```

Use `npm start` to start fast-food-fast app
```
e.g
User@guest MINGW64 ~/fast-food-fast
$ npm start
```
## _You can now test the API endpoints below via Postman_

## FOR TESTING PURPOSES
**FETCHES ALL ADMINS**
GET verb => host:port/api/v2/admins     {secured for only admin} testing purposes

**POPULATES DATABASE FOR TESTING**
POST verb => host:port/api/v2/pushall     {secured for only admin} populated table


## REQUIRED FOR ADMINS
**SIGNUP/ CREATE ACCOUNT**
POST verb => host:port/api/v2/auth/admin/signup {authentication required}
Input Fields => [username, firstname, lastname, phone, email
		adminToken, password, confirmPassword]
		
Use the token **_adminToken_** => `asdf;lkj` tocreate a new admin and test the API

**SIGNIN/LOGIN**
POST verb => host:port/api/v2/auth/admin/login  {secured}
Input Fields => [username, password]  {authentication required}

**SIGNOUT/LOGOUT**
POST verb => host:port/api/v2/admin/logout  {secured}
Input Fields => [username, password]  

**ADDS NEW MENU {DRINK}**
POST verb => host:port/api/v2/admin/menu/drinks  {secured}
Input Fields => [name, price]

**ADDS NEW MENU {FOOD}**
POST verb => host:port/api/v2/admin/menu/foods  {secured}
Input Fields => [name, price] 

**FETCHES ALL ORDERS**
GET verb => host:port/api/v2/orders  {secured}

**FETCHES A SPECIFIC ORDER**
GET verb => host:port/api/v2/orders/{orderid} =>  {secured} 

**UPDATE AN ORDER STATUS**
PUT verb => host:port/api/v2/orders/{orderid} => {secured}
Input Fields => [status] Entries => {completed, new, prcessing or cancelled }


## REQUIRED FOR USERS
FETCHES ALL USERS
GET verb => host:port/api/v2/users => {secured} Admin only testing purposes

**SIGNUP/CREATE ACCOUNT**
POST verb => host:port/api/v2/auth/signup => {secured} {authentication required}
Input Fields => [firstname, lastname, email, phone, password, confirmPassword]

**SIGNIN/LOGIN**
POST verb => host:port/api/v2/auth/login => {secured} 
Input Fields => [email, password] => {authentication required}

**SIGNOUT/LOGOUT**
POST verb => host:port/api/v2/logout {secured} 
Input Fields => [email, password]

**PLACE AN ORDER**
POST verb => host:port/api/v2/orders {secured}
Input Fields => [address, lga, state, foods, foodsQuantity, drinks, drinksQuantity]  

**FETCH ALL ORDER HISTORY SPECIFIC TO A USER**
GET verb => host:port/api/v2/users/:id/orders {secured}

**FETCH ALL MENUS**
GET verb => host:port/api/v2/menu {not secured}

**ACCESS THE ROOT API**
GET verb => host:port/ {not secured}


_Using the application/json format_
```
e.g
POST https://f-cube.herokuapp.com/api/v1/orders

 { 
    "address": "14 xyz road behind maggi cube",   
    "lga": "Lagos Island",   
    "state": "Lagos state",   
    "foods": ["chief burger", "rotisserie chicken"],
    "foodsQuantity": [2, 2]   
    "drinks": ["coca cola 50cl", "five alive 1L"],
    "drinksQuanity": [1, 1]
}   

```
Hit send on Postman and a bill together with your order details will be returned:
```
"bill": {       
    "subtotal": "₦5400",       
    "discount": "₦0",      
    "delivery": "₦250",       
    "total": "₦5650"   
  },    
    "status": "NEW"
} 
```

## Running the tests
Use `npm test` to run test to see a tabulated test result coverage

```
e.g
User@guest MINGW64 ~/fast-food-fast
$ npm test
```

### Break down into end to end tests
The test checks all the routes mention above for conformity. It also tests all the methods and classes used to control backend activities.

```
e.g
describe("Validation of users input", () => {
	it("should return 400 if firstname has an invalid character", (done) => {
		request.post("/api/v2/auth/signup")
			.send({
				firstname: "E>e8ka",
				lastname: "Epic",
				email: "andela.twentyone@gmail.com",
				phone: "08099999999",
				password: "andela21",
				confirmPassword: "andela21"
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
});
```
The example able is a test to validate the user form input fields.
It expects a status code of 400 if the user accesses the route `host:port/api/v2/auth/signup` with an invalid firstname character.
It checks the each character of the users input to check for an invalid English alphabet. It flags the field if its not a valid alphabet.


## Deployment
You can host this application on any server that is compatible with Nodejs apps.
* [Currently hosted on Heroku](https://f-cube.herokuapp.com/)

## RESTful API documentation
* [FastFoodFast API Documentation](https://f-cube.herokuapp.com/api-documentation)

## Built With
* [Javascript | NodeJs](https://nodejs.org/en/) - The web framework used
* [Node Package Manager](https://www.npmjs.com/) - Dependency Management
* [Mocha](https://mochajs.org/) - Testing framework
* [Chai](http://www.chaijs.com/) - Testing framework

## UI/UX Template

* [Customers](https://shaolinmkz.github.io/fast-food-fast/ui/) - HTML, CSS and Javascript
* [Administrator](https://shaolinmkz.github.io/fast-food-fast/ui/admin.html) - HTML, CSS and Javascript

## Hosted server
* [F-cube](https://f-cube.herokuapp.com/)- API root => Welcome message

## Versioning
Git-Hub 

## Authors
* **Nwabuzor, Chukwuemeka Obiora** - *Initial work* - [Git-hub repo link](https://github.com/shaolinmkz/fast-food-fast)

## Credits
[Andela Fellowship](https://andela.com/fellowship/)

## Acknowledgments
* I appreciate anyone who has impacted in these project. You are all awesome!!!
* Salute to all my Learning facilitators and team mates. Your're the real MVP!!!
* I appreciate my Dad and family members for their strong support. Your're truly exceptional!!!
