const banner = document.getElementById("bannerImg");
const quotesDisplay = document.getElementById("quotes");
const words = document.getElementsByName("words");
const signup = document.getElementById("signup");
const signupModal = document.getElementsByClassName("signup-modal")[0];
const login = document.getElementById("signin");
const loginModal = document.getElementsByClassName("login-modal")[0];
const fastfoodfast = document.getElementsByClassName("fastfoodfast")[0];

let nextCount = 1, i = 0;

/**
 * Switches images every 1 minute or 60 seconds
 * @event { click }
 * @function {{slideshow}}
 */
const slideshow = () => {
	banner.setAttribute("src", `./images/food${nextCount}.png`);
	quotesDisplay.innerHTML = words[i].innerHTML; 
	nextCount++;
	i++;
	if (i > 11) {
		i = 0;
	}
	if (nextCount === 14) {
		nextCount = 1;
	}
};

setInterval(slideshow, 3000);

/**
 * Open modal for sign up
 * @event { click }
 * @function {{Anonymous Function}}
 */
signup.addEventListener("click", () => {
	signupModal.style.display = "block";
	loginModal.style.display = "none";
});

/**
 * close modal onclick outside for signup
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
 * @function {{Anonymous Function}}
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
	window.location.assign("./home.html");
};
