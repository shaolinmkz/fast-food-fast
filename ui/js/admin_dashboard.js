const orderModal = document.getElementsByClassName("order-modal")[0];
const close = document.getElementById("close");
const logo = document.getElementById("logo");
const viewOrder = document.getElementsByClassName("view-order");


//Open modal to view order fro Admin
//Credit: Idea from Stackover flow
window.onclick = function () {
	let index;
	for (index = 0; index < viewOrder.length; ++index) {
		viewOrder[index].onclick = function () {
			orderModal.style.display = "block";
		};
	}
};

// close modal onclick outside for signup
function closeOrderModal(m) {
	if (m.target === orderModal) {
		orderModal.style.display = "none";
	}
}
window.addEventListener("click", closeOrderModal);

// close modal onclick the close button
close.addEventListener("click", () => {
	orderModal.style.display = "none";
});

logo.onclick = () => {
	window.location.assign("./admin.html");
};