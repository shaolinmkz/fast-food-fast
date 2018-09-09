const banner = document.getElementById("banner");
const signup = document.getElementById("signup");
const signupModal = document.getElementsByClassName("signup-modal")[0];
const signupBox = document.getElementsByClassName("signup-box")[0];

let count = 0, nextCount = 1, format = "png";

function slideshow() {
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
}

setInterval(slideshow, 60000);

//Open modal for sign up
signup.addEventListener("click", () => {
    signupModal.style.display = "block";
});

// close modal onclick outside
function closeModal (m) {
    if (m.target === signupModal) {
        signupModal.style.display = "none";
    }
}
window.addEventListener("click", closeModal);

//Close modal on click x
