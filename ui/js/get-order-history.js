const token3 = localStorage.getItem("token");
const decodedToken = jwt_decode(token3);
const userId = decodedToken.id;

const getHistory = () => {
	fetch(`http://localhost:7000/api/v2/users/${userId}/orders`, {
		method: "GET",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"x-access-token": token3
		}
	})
		.then(res => res.json())
		.then(data => {
			const { history, status, message } = data;
			if (status.length === 7) {

				let dateAppend = ` <div class='bold'>Order No.</div>
                         <div class='bold' > Ordered Items</div >
                         <div class='bold'>Billing Breakdown</div>
                         <div class='bold' >Date/Time</div>
                         `;


				history.forEach((elem) => {
					dateAppend += `
                    <div>${elem.id} <br> ${elem.status} </div>
                    <div><span class='bold'>Food Item(s):</span> ${elem.food_items} <br> <span class='bold'>Food Quantities:</span> ${elem.food_quantities} <br> <br>
                        <p><span class='bold'>Drink Item(s):</span> </span> ${elem.drink_items} <br> <span class='bold'>Drink Quantities</span> ${elem.drink_quantities}</p>
                    </div>
                    <div><span class='bold'>Subtotal:</span> ₦${elem.subtotal} <br>
                    <span class='bold'>Delivery:</span> ₦${elem.delivery} <br><span class='bold'>Discount:</span> ₦${elem.discount} <br>
                   <span class='bold'> Total:</span> ₦${elem.total}</div>
                    <div>${elem.created_date.slice(0,10)} <br>
                    ${elem.created_date.slice(11, 19)}</div>
                   `;
					return document.getElementById("grid-history").innerHTML = dateAppend;
				}); } else {
				document.getElementsByClassName("historyDisplay")[0].innerHTML = message;
			}

		})
		.catch(err => console.log(err));
};




window.addEventListener("load", getHistory);



