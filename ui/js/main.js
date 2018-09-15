const banner = document.getElementById("bannerImg");
const signup = document.getElementById("signup");
const signupModal = document.getElementsByClassName("signup-modal")[0];
const login = document.getElementById("signin");
const loginModal = document.getElementsByClassName("login-modal")[0];
const fastfoodfast = document.getElementsByClassName("fastfoodfast")[0];

let nextCount = 1, format = "png";

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
banner.addEventListener("click", slideshow);

//Open modal for sign up
signup.addEventListener("click", () => {
	signupModal.style.display = "block";
});

// close modal onclick outside for signup
function closeSignupModal (m) {
	if (m.target === signupModal) {
		signupModal.style.display = "none";
	}
}
window.addEventListener("click", closeSignupModal);

//Open modal for Login
login.addEventListener("click", () => {
	loginModal.style.display = "block";
});

// close modal onclick outside for Login
function closeLoginModal(e) {
	if (e.target === loginModal) {
		loginModal.style.display = "none";
	}
}
window.addEventListener("click", closeLoginModal);

//onclick fastfoodfast sitename direct me to home

fastfoodfast.onclick = () => {
	window.location.assign("./home.html");
};