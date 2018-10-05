
const getMenu = () => {
	fetch("https://f-cube.herokuapp.com/api/v2/menu")
		.then(res => res.json())
		.then(data => {
			let solidmeals = "<h1>Meals and Combos</h1>";
			let liquidmeals = "<h1>Drinks</h1>";
			let chooseMeal = "<option> Choose a meal <option>";
			let chooseDrink = "<option> Choose a drink <option>";

			data.solid_meals.forEach((food) => {
				solidmeals += `
        <div class="order-item"><img src=${food.image} alt="food-catalog">
            <p>${food.name.toUpperCase()}</p><label class="price">₦${food.price}</label>
        </div>
        `;

				chooseMeal += `
        <option> ${food.name.toUpperCase()} </option>
        `;
			});

			data.liquid_meals.forEach((drink) => {
				liquidmeals += `
        <div class="order-item"><img src=${drink.image} alt="food-catalog">
            <p>${drink.name.toUpperCase()}</p><label class="price">₦${drink.price}</label>
        </div>
        `;

				chooseDrink += `
        <option> ${drink.name.toUpperCase()} </option>
        `;
			});
			document.getElementsByClassName("select-option-m")[0].innerHTML = chooseMeal;
			document.getElementsByClassName("select-option-d")[0].innerHTML = chooseDrink;
			document.getElementsByClassName("food-catalog")[0].innerHTML = solidmeals;
			document.getElementsByClassName("drink-catalog")[0].innerHTML = liquidmeals;
		})
		.catch(err => console.log(err));
};

window.addEventListener("load", getMenu);

// const selectionForm = document.getElementById("menu-selection");
let foodSelection = document.getElementsByClassName("select-option-m")[0];
let drinkSelection = document.getElementsByClassName("select-option-d")[0];
// const price = document.getElementsByClassName("price")[0];
let displayActions = document.getElementById("displayActions");
let addToCart = document.getElementById("add-to-cart");
let foodQuantity = document.getElementById("foods-quantity");
let drinkQuantity = document.getElementById("drinks-quantity");




const cartAdd = () => {
	let foodSelections, drinkSelections, foodQuantities, drinkQuantities;

	if ( foodQuantity.value === "" ||  drinkQuantity.value === "" ){
		displayActions.style.color = "red";
		return displayActions.innerHTML = "Specific Quantity";
	}

	if (localStorage.getItem("foodSelections") === null || localStorage.getItem("drinkSelections") === null ) {
		foodSelections = [];
		drinkSelections = [];
		foodQuantities = [];
		drinkQuantities = [];
	} else {
		foodSelections = JSON.parse(localStorage.getItem("foodSelections"));
		drinkSelections = JSON.parse(localStorage.getItem("drinkSelections"));
		foodQuantities = JSON.parse(localStorage.getItem("foodQuantities"));
		drinkQuantities = JSON.parse(localStorage.getItem("drinkQuantities"));
	}

	foodSelections.push(foodSelection.value);
	foodQuantities.push(foodQuantity.value);
	drinkSelections.push(drinkSelection.value);
	drinkQuantities.push(drinkQuantity.value);

	localStorage.setItem("foodSelections", JSON.stringify(foodSelections));
	localStorage.setItem("foodQuantities", JSON.stringify(foodQuantities));
	localStorage.setItem("drinkSelections", JSON.stringify(drinkSelections));
	localStorage.setItem("drinkQuantities", JSON.stringify(drinkQuantities));

	// localStorage.setItem("foodSelections", JSON.stringify([]));
	// localStorage.setItem("foodQuantities", JSON.stringify([]));
	// localStorage.setItem("drinkSelections", JSON.stringify([]));
	// localStorage.setItem("drinkQuantities", JSON.stringify([]));


	// console.log(foodSelection.value);
	// console.log(foodQuantity.value);

	// console.log(drinkSelection.value);
	// console.log(drinkQuantity.value);


	displayActions.style.color = "green";
	displayActions.innerHTML = "Added To Cart";
};

addToCart.addEventListener("click", cartAdd);


const navCart = document.getElementById("nav-cart");


const populateCart = () => {
	const food_items = JSON.parse(localStorage.getItem("foodSelections"));
	const food_quantity = JSON.parse(localStorage.getItem("foodQuantities"));
	const drink_Items = JSON.parse(localStorage.getItem("drinkSelections"));
	const drink_quantity = JSON.parse(localStorage.getItem("drinkQuantities"));

  let n = "<label class= 'bold'  style='font-size: 100%; text-align: center;'> ITEMS</label>", m = "<label class= 'bold' style='font-size: 100%; text-align: center;'>Quantity</label>";


	food_items.forEach((item) => {
    n += `<label style="font-size: 0.9em; text-align: center;">${item} </label> &times; <br>`;
	});

	food_quantity.forEach((item) => {
    m += `<label >${item}</label><br>`;
	});

	drink_Items.forEach((item) => {
    n += `<label style="font-size: 0.8em; text-align: center;" >${item} </label> &times; <br>`;
	});

	drink_quantity.forEach((item) => {
    m += `<label">${item}</label><br>`;
  });
  console.log(n, m);
	document.getElementsByClassName("itemList")[0].innerHTML = n;
	document.getElementsByClassName("quantityList")[0].innerHTML = m;
};

navCart.addEventListener("click", populateCart);

