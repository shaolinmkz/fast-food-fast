const signup = document.getElementById("signup");
const signupModal = document.getElementsByClassName("signup-modal")[0];
const login = document.getElementById("signin");
const loginModal = document.getElementsByClassName("login-modal")[0];
const fastfoodfast = document.getElementsByClassName("fastfoodfast")[0];

/**
 * Open modal for sign up
 * @event { click }
 * @function {{Anonymous function}}
 */
signup.addEventListener("click", () => {
	signupModal.style.display = "block";
	loginModal.style.display = "none";
});

/**
 * Close modal onclick outside create admin box
 * @event { click }
 * @function {{closeSignupModal}}
 */
const closeSignupModal = (m) => {
	if (m.target === signupModal) {
		signupModal.style.display = "none";
		
	}
};
window.addEventListener("click", closeSignupModal);

/**
 * Open modal for Login
 * @event { click }
 * @function {{Anonymous function}}
 */
login.addEventListener("click", () => {
	loginModal.style.display = "block";
	signupModal.style.display = "none";
});

/**
 * Close modal onclick outside for Login
 * @event { click }
 * @function {{closeLoginModal}}
 */
const closeLoginModal = (e) => {
	if (e.target === loginModal) {
		loginModal.style.display = "none";
	}
};
window.addEventListener("click", closeLoginModal);

/**
 * Navigates user to the index or landing page
 * @event { onclick }
 * @function {{Anonymous function}}{{Click event that targets the HTML class "fastfoodfast"}}
 */
fastfoodfast.onclick = () => {
	window.location.assign("./admin.html");
};
