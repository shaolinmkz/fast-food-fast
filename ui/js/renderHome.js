
const getMenu = () => {
  fetch("http://localhost:7000/api/v2/menu")
		.then(res => res.json())
		.then(data => {
			let solidmeals = "<h1>Meals and Combos</h1>";
			let liquidmeals = "<h1>Drinks</h1>";
			let chooseMeal = "<option> Choose a meal <option>";
			let chooseDrink = "<option> Choose a drink <option>";

			data.solid_meals.forEach((food) => {
				solidmeals += `
        <div class="order-item"><img src=${food.image} alt="food-catalog">
            <p>${food.name}</p><label class="price">₦${food.price}</label>
        </div>
        `;

				chooseMeal += `
        <option> ${food.name.toUpperCase()} </option>
        `;
			});

			data.liquid_meals.forEach((drink) => {
				liquidmeals += `
        <div class="order-item"><img src=${drink.image} alt="food-catalog">
            <p>${drink.name}</p><label class="price">₦${drink.price}</label>
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



