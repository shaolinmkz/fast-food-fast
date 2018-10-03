const addFoodsMenu = document.getElementById("add-menu-foods");
const addDrinksDrink = document.getElementById("add-menu-drinks");

const addFoodUrl = "https://f-cube.herokuapp.com/api/v2/admin/menu/foods";
const addDrinkUrl = "https://f-cube.herokuapp.com/api/v2/admin/menu/drinks";

const token = localStorage.getItem("adminToken");

/**
 * Fetch apifor admin sign-up
 * @param {any} event - prevents page from submitting
 */
const addFoods = (e) => {
	e.preventDefault();
	const name = document.getElementById("food-name").value;
	const price = document.getElementById("food-price").value;
	const image = document.getElementById("food-url").value;
	const disp = document.getElementById("disp-message-f");

	fetch(addFoodUrl, {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"authorization": token
		},
		body: JSON.stringify({
			name: name,
			price: price,
			image: image
		})
	})
		.then((res) => res.json())
		.then((data) => {
			const { message, status } = data;
			if (status.length === 7) {
        console.log(data);
				disp.style.color = "rgb(4, 228, 19)";
				disp.innerHTML = message;
				return;
			} else {
				disp.style.color = "red";
				disp.innerHTML = message;
				return;
			}
		})
		.catch(err => {
			return disp.innerHTML = err;
		});
};

addFoodsMenu.addEventListener("submit", addFoods);

/**
 * Fetch apifor admin sign-up
 * @param {any} event - prevents page from submitting
 */
const addDrink = (event) => {
	event.preventDefault();
	const name = document.getElementById("drink-name").value;
	const price = document.getElementById("drink-price").value;
	const image = document.getElementById("drink-url").value;
	const disp = document.getElementById("disp-message-d");

	fetch(addDrinkUrl, {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"authorization": token
		},
		body: JSON.stringify({
			name: name,
			price: price,
			image: image
		})
	})
		.then((res) => res.json())
		.then((data) => {
			const { message } = data;

			if (data.status.length === 7) {
				disp.style.color = "rgb(4, 228, 19)";
				disp.innerHTML = message;
				return;
			} else {
				disp.style.color = "red";
				disp.innerHTML = message;
				return;
			}
		})
		.catch(err => {
			return disp.innerHTML = err;
		});
};

addDrinksDrink.addEventListener("submit", addDrink);