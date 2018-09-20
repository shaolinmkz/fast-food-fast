const orderItem = document.getElementsByClassName("order-item");
const orderModal = document.getElementsByClassName("order-modal")[0];
const close = document.getElementById("close");
const banner = document.getElementById("bannerImg");
const logo = document.getElementById("logo");

let nextCount = 1, format = "png";

/**
 * Switches images every 1 minute or 60 seconds
 * @event { click }
 * @function {{slideshow}}
 */
const slideshow = () => {
	if (nextCount === 12) {
		format = "jpg";
	} else {
		format = "png";
	}
	banner.setAttribute("src", `./images/food${nextCount}.${format}`);
	nextCount++;
	if (nextCount === 14) {
		nextCount = 1;
	}
};
setInterval(slideshow, 90000);
banner.addEventListener("click", slideshow);

/**
 * Open modal for item selection (add to cart)
 * @event { click }
 * @function {{Anonymous Function}}
 */
window.onclick = () => {
	let index;
	for (index = 0; index < orderItem.length; ++index) {
		orderItem[index].onclick = function(){
			orderModal.style.display = "block";
		};
	}
};

/**
 * close modal onclick outside item selection (add to cart)
 * @event { click }
 * @function {{closeOrderModal}}
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
 * @function {{Anonymous Function}}
 */
close.addEventListener("click", () => {
	orderModal.style.display = "none";
});

/**
 * Navigates user to the index or landing page
 * @event { onclick }
 * @function {{Anonymous function}}{{Click event that targets the HTML id "logo"}}
 */
logo.onclick = () => {
	window.location.assign("./index.html");
};
