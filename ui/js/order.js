const orderItem = document.getElementsByClassName("order-item");
const orderModal = document.getElementsByClassName("order-modal")[0];
const close = document.getElementById("close");
const banner = document.getElementById("bannerImg");
const logo = document.getElementById("logo");

let nextCount = 1, format = "png";

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

//Open modal for order
//Credit: Idea from Stackover flow
window.onclick = () => {
	let index;
	for (index = 0; index < orderItem.length; ++index) {
		orderItem[index].onclick = function(){
			orderModal.style.display = "block";
		};
	}
};

// close modal onclick outside for signup
const closeOrderModal = (m) => {
	if (m.target === orderModal) {
		orderModal.style.display = "none";
	}
};
window.addEventListener("click", closeOrderModal);

// close modal onclick the close button
close.addEventListener("click", () => {
	orderModal.style.display = "none";
});

logo.onclick = () => {
	window.location.assign("./index.html");
};