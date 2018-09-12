const orderModal = document.getElementsByClassName("order-modal")[0];
const orderBox = document.getElementsByClassName("order-box")[0];
const close = document.getElementById("close");
const logo = document.getElementById("logo");


// close modal onclick outside for signup
function closeOrderModal(m) {
    if (m.target === orderModal) {
        orderModal.style.display = "none";
    };
};
window.addEventListener("click", closeOrderModal);

// close modal onclick the close button
close.addEventListener("click", () => {
    orderModal.style.display = "none";
});

logo.onclick = () => {
    window.location.assign("./admin_dashboard.html");
};