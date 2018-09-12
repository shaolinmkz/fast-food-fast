const signup = document.getElementById("signup");
const signupModal = document.getElementsByClassName("signup-modal")[0];
const signupBox = document.getElementsByClassName("signup-box")[0];
const login = document.getElementById("signin");
const loginModal = document.getElementsByClassName("login-modal")[0];
const loginBox = document.getElementsByClassName("login-box")[0];
const fastfoodfast = document.getElementsByClassName("fastfoodfast")[0];

//Open modal for sign up
signup.addEventListener("click", () => {
    signupModal.style.display = "block";
});

// close modal onclick outside for signup
function closeSignupModal(m) {
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

//onclick fastfoodfast name it directs user to index

fastfoodfast.onclick = () => {
    window.location.assign("./admin.html");
};