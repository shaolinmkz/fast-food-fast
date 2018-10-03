const foodsForm = document.getElementById("add-menu-foods");
const drinksForm = document.getElementById("add-menu-drinks");

const openFoodsForm = document.getElementById("open-foods-form");
const openDrinksForm = document.getElementById("open-drinks-form");


openFoodsForm.addEventListener("click", () => {
	drinksForm.style.display = "none";
	foodsForm.style.display = "block";
	openFoodsForm.style.color = "black";
	openDrinksForm.style.color = "white";
});

openDrinksForm.addEventListener("click", () => {
	drinksForm.style.display = "block";
	openDrinksForm.style.color = "black";
	foodsForm.style.display = "none";
	openFoodsForm.style.color = "white";
});

