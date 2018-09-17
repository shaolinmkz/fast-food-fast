const orderModal = document.getElementsByClassName("order-modal")[0];
const close = document.getElementById("close");
const logo = document.getElementById("logo");
const viewOrder = document.getElementsByClassName("view-order");


/**
 * Open modal to view customer order from Admin dashboard
 * Credit: Idea from Stackover flow
 * @event { onclick }
 * @function {{Anonymous function}}{{Creates click events for an array of HTML classes}}
 */
window.onclick = () => {
	let index;
	for (index = 0; index < viewOrder.length; ++index) {
		viewOrder[index].onclick = () => {
			orderModal.style.display = "block";
		};
	}
};

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
