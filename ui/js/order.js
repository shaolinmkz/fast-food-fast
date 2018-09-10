const orderItem = document.getElementsByClassName("order-item");
const orderModal = document.getElementsByClassName("order-modal")[0];
const orderBox = document.getElementsByClassName("order-box")[0];
const close = document.getElementById("close");


//Open modal for order
window.onclick = function(){
    let index;
    for (index = 0; index < orderItem.length; ++index) {
        orderItem[index].onclick = function(){
            orderModal.style.display = "block";
        };
    };
};

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