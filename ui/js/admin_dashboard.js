const orderModal = document.getElementsByClassName("order-modal")[0];
const close = document.getElementById("close");
const logo = document.getElementById("logo");
const viewOrder = document.getElementsByClassName("view-order");
const processing = document.getElementsByClassName("processing");
const cancelled = document.getElementsByClassName("cancelled");
const complete = document.getElementsByClassName("complete");
const adToken = localStorage.getItem("adminToken");
let status = "Empty";
let orderId = 0, orderId2 = 0;

/**
 * Open modal to view customer order from Admin dashboard
 * Credit: Idea from Stackover flow
 * @event { onclick }
 * @function {{view An Order}}{{Creates click events for an array of HTML classes}}
 */
const viewAnOrder = () => {
	let index;
	for (index = 0; index < viewOrder.length; ++index) {

		viewOrder[index].onclick = (e) => {
			orderModal.style.display = "block";
			let tag = e.target.innerHTML;
			orderId = tag.toString().slice(tag.length - 1, tag.length);
			getSpecificOrder();
		};
	}
};

const runSearch1 = () => {
	let index2;
	for (index2 = 0; index2 < cancelled.length; ++index2) {
		cancelled[index2].onclick = (b) => {
			let tag = b.target.innerHTML;
			orderId2 = tag.toString().slice(tag.length - 1, tag.length);
			status = tag;
			const check = confirm("ARE YOU SURE?");
			if (check) {
				changeOrderStatus();
			}
		};
	}
};

const runSearch2 = () => {
	let index2;
	for (index2 = 0; index2 < complete.length; ++index2) {
		complete[index2].onclick = (b) => {
			let tag = b.target.innerHTML;
			orderId2 = tag.toString().slice(tag.length - 1, tag.length);
			status = tag;
			const check = confirm("ARE YOU SURE?");
			if (check) {
				changeOrderStatus();
			}
		};
	}
};

const runSearch3 = () => {
	let index2;
	for (index2 = 0; index2 < processing.length; ++index2) {
		processing[index2].onclick = (b) => {
			let tag = b.target.innerHTML;
			orderId2 = tag.toString().slice(tag.length - 1, tag.length);
			status = tag;
			const check = confirm("ARE YOU SURE?");
			if (check) {
				changeOrderStatus();
			}
		};
	}
};

window.addEventListener("click", viewAnOrder);
window.addEventListener("click", runSearch1);
window.addEventListener("click", runSearch2);
window.addEventListener("click", runSearch3);


/**
 * Close modal onclick outside for create admin modal form
 * @event { click }
 * @function {{closeOrderModal}}{{Click event that targets the outter modal}}
 */
const closeOrderModal = (m) => {
	if (m.target === orderModal) {
		orderModal.style.display = "none";
	}
};
window.addEventListener("click", closeOrderModal);

/**
 * Close modal onclick the close button
 * @event { click }
 * @function {{Anonymous function}}{{Click event that targets the id "close"}}
 */
close.addEventListener("click", () => {
	orderModal.style.display = "none";
});

/**
 * Navigates user to the admin home page
 * @event { onclick }
 * @function {{Anonymous function}}{{Click event that targets the id "logo"}}
 */
logo.onclick = () => {
	window.location.assign("./admin.html");
};



const getAllOrders = () => {
	fetch("https://f-cube.herokuapp.com/api/v2/orders", {
		method: "GET",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"x-access-token": adToken
		}
	})
		.then(res => res.json())
		.then(data => {

			const { allOrders } = data;

			let elementAppend = `
      <section class="clearfix dashboard">
        <div class="div-container clearfix">
            <div>
                <p class="bold">Order No.</p>

            </div>
            <div>
                <p class="bold">Order Date/Time</p>
            </div>
            <div>
                <p class="bold">Order Status</p>
            </div>
            <div>
                <p class="bold">Action</p>
            </div>
        </div>
          `;


			allOrders.forEach((elem) => {
				elementAppend +=
        `<div class="div-container new-container clearfix">
            <div>
                <p class="pad order-number" style="text-align: center;">${elem.id}</p>
                <p class="greenbg white margin alter-greenbg" >User Id: <span > ${elem.user_id}<span></p>
            </div>
            <div>
                <p><span class="blue bold">ordered on</span> ${elem.created_date.slice(0, 10)} &nbsp; ${elem.created_date.slice(11, 19)}</p>
            </div>
            <div>
        <p class= "fix"><span class="green bold">Status</span> ${elem.status}</p>
            </div>
            <div>
                <p class="remove bluebg white margin-auto view-order">VIEW ORDER ${elem.id}</p>
                <p class="remove redbg white margin-auto cancelled">CANCELLED ${elem.id}</p>
                <p class="remove greenbg white margin-auto processing">PROCESSING ${elem.id}</p>
                <p class="remove greenbg white alter-greenbg margin-auto complete">COMPLETE ${elem.id}</p>
            </div>
        </div>

          `;

			});


			document.getElementsByClassName("dashboard")[0].innerHTML = elementAppend;
		})
		.catch(err => console.log(err));
};

setTimeout(()=>{
	document.getElementById("total-orders").innerHTML = document.getElementsByClassName("new-container").length;
}, 100);
window.addEventListener("load", getAllOrders);

setInterval(() => {
	document.getElementById("inputTime").innerHTML = Date();
}, 100);
window.addEventListener("load", getAllOrders);



const getSpecificOrder = () => {
	fetch(`https://f-cube.herokuapp.com/api/v2/orders/${Number(orderId)}`, {
		method: "GET",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"x-access-token": adToken
		}
	})
		.then(res => res.json())
		.then(data => {

			const { order, userDetails } = data;
			let y = ""; let z="";

			order.forEach((elem) => {

				y += `<section>
                   <section class="clearfix">
                        <div>
                            <ol>
                                <li class="bold"> Items </li>
                                <li >${elem.food_items}</li>
                                <li>${elem.food_quantities}</li>
                                <li>${elem.drink_items}</li>
                                <li>${elem.drink_quantities}</li>
                                <li class="bold">Subtotal</li>
                                <li class="bold">Delivery</li>
                                <li class="bold">Discount</li>
                                <li class="bold">Total</li>
                            </ol>
                        </div>
                        <div>
                            <ol>
                                <li class="bold">Amount</li>
                                <li>Null</li>
                                <li>Null</li>
                                <li>Null</li>
                                <li>Null</li>
                                <li>₦${elem.subtotal}</li>
                                <li>₦${elem.delivery}</li>
                                <li>₦${elem.discount}</li>
                                <li>₦${elem.total}</li>
                            </ol>
                        </div>
                    </section>
            </section>
            `;

				userDetails.forEach((elem) => {
					z += `
    <div class="iso">
                    <ol>
                        <li>Full name</li>
                        <li>Email</li>
                        <li>Mobile number</li>
                        <li>Address</li>
                        <li>Local government</li>
                        <li>State</li>
                    </ol>
                </div>
                <div>
                    <ol>
                        <li>${elem.fullname}</li>
                        <li>${elem.email}</li>
                        <li>${elem.phone}</li>
                        <li>${elem.address}</li>
                        <li>${elem.lga}</li>
                        <li>${elem.state}</li>
                    </ol>
                </div>
           `;
				});
			});

			document.getElementById("target2").innerHTML = y;
			document.getElementById("target3").innerHTML = z;
		})
		.catch(err => console.log(err));
};


const changeOrderStatus = () => {

	const statusChange = status.toString().slice(0,status.length-2);

	fetch(`https://f-cube.herokuapp.com/api/v2/orders/${Number(orderId2)}`, {
		method: "PUT",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"x-access-token": adToken
		},
		body: JSON.stringify({
			status: statusChange
		})
	})
		.then(res => res.json())
		.then(data => {
			const { message, status } = data;
			let display = document.getElementById("displayResult");
			if (status.length === 7) {
				display.style.color = "green";
        display.innerHTML = message;
        window.location.reload();
			} else {
				display.style.color = "red";
				display.innerHTML = message;
			}
		})
		.catch(err => console.log(err));
};
