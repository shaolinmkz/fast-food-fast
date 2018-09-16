[![Coverage Status](https://coveralls.io/repos/github/shaolinmkz/fast-food-fast/badge.svg?branch=develop)](https://coveralls.io/github/shaolinmkz/fast-food-fast?branch=develop) [![Build Status](https://travis-ci.org/shaolinmkz/fast-food-fast.svg?branch=develop)](https://travis-ci.org/shaolinmkz/fast-food-fast) [![Maintainability](https://api.codeclimate.com/v1/badges/ea8f85b0311fcceebd51/maintainability)](https://codeclimate.com/github/shaolinmkz/fast-food-fast/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ea8f85b0311fcceebd51/test_coverage)](https://codeclimate.com/github/shaolinmkz/fast-food-fast/test_coverage)

# Fast-Food-Fast
Fast-Food-Fast​ is a food delivery service app for a restaurant where you can place your order and get your food as soon as possible.
It is written in Javascript(NodeJs for server), HTML and CSS.

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
You can now test the API endpoints below via Postman
   * GET `localhost:7000/api/v1/orders`
   * GET `localhost:7000/api/v1/orders/<orderid>`
   * POST `localhost:7000/api/v1/orders`
   * PUT `localhost:7000/api/v1/orders/<orderid>`
   * GET `localhost:7000/api/v1/orders/menus/foods`
   * GET `localhost:7000/api/v1/orders/menus/drinks`
   * GET `localhost:7000/api/v1/orders/menus/foods/<foodid>`
   * GET `localhost:7000/api/v1/orders/menus/drinks/<drinkid>`

_Using the application/json format_
```
e.g
POST localhost:7000/api/v1/orders

 {   
    "firstname": "Jane",  
    "lastname": "Doe",    
    "email": "janedoe@testmail.com",  
    "phone": 2348037343239,   
    "addressNo": 14,   
    "address": "xyz road behind maggi cube",   
    "lga": "Lagos Island",   
    "state": "Lagos state",   
    "foods": ["chief burger", "rotisserie chicken"],   
    "drinks": ["coca cola 50cl", "five alive 1L"]
}   

```
Hit send on Postman and a bill together with your order details will be returned:
```
"bill": {       
    "subtotal": "₦1800",       
    "discount": "₦0",      
    "delivery": "₦250",       
    "total": "₦2050"   
  },    
    "status": "pending"
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
```
The example able is a test to check the GET all food menu route.
It expects a status code of 200 if the user accesses the route `localhost:7000/api/v1/orders/menus/foods`.
It checks the length of the food database structure and asserts if there is any property called "price" in the food database object.
Finally, it check if the respond message deeply equals the "All meals have been delivered successfully" before it ends.


## Deployment
You can host this application on any server that is compatible with Nodejs apps.

## Built With
* [Javascript | NodeJs](https://nodejs.org/en/) - The web framework used
* [Node Package Manager](https://www.npmjs.com/) - Dependency Management
* [Mocha](https://mochajs.org/) - Testing framework
* [Chai](http://www.chaijs.com/) - Testing framework

## UI/UX Template

* [Customers](https://shaolinmkz.github.io/fast-food-fast/ui/) - html and css
* [Administrator](https://shaolinmkz.github.io/fast-food-fast/ui/admin.html) - html and css

## Versioning
Git-Hub 

## Authors
* **Nwabuzor, Chukwuemeka Obiora** - *Initial work* - [Git-hub repo link](https://github.com/shaolinmkz/fast-food-fast)

## Acknowledgments
* I appreciate anynoe who has impacted in these project. You are all awesome!!!
* .................
* ......