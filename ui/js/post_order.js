const placeNewOrder = document.getElementById("order-form");

const populateCart = () => {
	const food_items = JSON.parse(localStorage.getItem("foodSelections"));
	const food_quantity = JSON.parse(localStorage.getItem("foodQuantities"));
	const drink_Items = JSON.parse(localStorage.getItem("drinkSelections"));
	const drink_quantity = JSON.parse(localStorage.getItem("drinkQuantities"));

	let n = "<li class='bold'>Item(s)</li>", m = "<li class='bold'>Quantity</li>";


	food_items.forEach((item) => {
		n += `<li class="checkorder">${item}</li>`;
	});

	food_quantity.forEach((item) => {
		m += `<label class="checkorderQ">${item}</label><br>`;
	});

	drink_Items.forEach((item) => {
		n += `<li class="checkorder">${item}</li>`;
	});

	drink_quantity.forEach((item) => {
		m += `<label" class="checkorderQ">${item}</label><br>`;
	});

	document.getElementsByClassName("list")[0].innerHTML = n;
	document.getElementsByClassName("listq")[0].innerHTML = m;
};

window.addEventListener("load", populateCart);



const placeOrder = (event) => {
	event.preventDefault();

	const address = document.getElementById("address").value;
	const lga = document.getElementById("lga").value;
	const state = document.getElementById("state").value;
	const foods = JSON.parse(localStorage.getItem("foodSelections"));
	const foodsQuantity = JSON.parse(localStorage.getItem("foodQuantities"));
	const drinks = JSON.parse(localStorage.getItem("drinkSelections"));
	const drinkQuantity = JSON.parse(localStorage.getItem("drinkQuantities"));
	const disp = document.getElementById("disp-mssg");


	fetch("https://f-cube.herokuapp.com/api/v2/orders", {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"authorization": localStorage.getItem("token")
		},
		body: JSON.stringify({
			address: address,
			lga: lga,
			state: state,
			foods: foods,
			foodsQuantity: foodsQuantity,
			drinks: drinks,
			drinkQuantity: drinkQuantity
		})
	})
		.then((res) => res.json())
		.then((data) => {
			disp.innerHTML = data.status;
			const { message, bill } = data;
			if (data.status.length === 7) {
				disp.style.color = "rgb(4, 228, 19)";
				disp.innerHTML = message;
				let n = "";

				bill.forEach((billing) => {
					n += `
          <ol>
          <li class="checkorder">Subtotal: ${billing.subtotal}</li>
          <li class="checkorder">Discount: ${billing.discount}</li>
          <li class="checkorder">Delivery: ${billing.delivery}</li>
          <li class="checkorder">Total: ${billing.total}</li>
          </ol>
          `;
				});
				document.getElementById("message").innerHTML = n;
				return;
			} else {
				disp.style.backgroundColor = "white";
				disp.style.color = "red";
				disp.innerHTML = message;
				return;
			}
		})
		.catch(err => {
			return disp.innerHTML = err;
		});
};

placeNewOrder.addEventListener("submit", placeOrder);



const fillOrderFormAutomatically = () => {
	const token = localStorage.getItem("token");

	const decoded = jwt_decode(token);

	let { fullname, email, mobile_number } = decoded;

	let lastname = fullname.split(",")[0];
	let firstname = fullname.split(",")[1];

	document.getElementsByClassName("format")[0].innerHTML = firstname;
	document.getElementsByClassName("format")[1].inerHTML = lastname;
	document.getElementsByClassName("format")[2].innerHTML = email;
	document.getElementsByClassName("format")[3].innerHTML = mobile_number;
};

window.addEventListener("load", fillOrderFormAutomatically);




