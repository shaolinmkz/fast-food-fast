const signUp = document.getElementById("signup-form");
const token = window.localStorage.getItem("token");

const index = "http://localhost:7000/admin";
const home = "http://localhost:7000/dashboard";

const signupFetch = "http://localhost:7000/api/v2/auth/admin/signup";



//checks if token is valid
const autoAuth2 = () => {
	if ((getItems("adminToken") !== null)) {
		let current_time = new Date().getTime();
		current_time = parseInt(current_time / 1000);
		const decoded = jwt_decode(token);

		if ((current_time > decoded.exp) || (getItems("adminToken") === null)) {
			if (window.location.href !== index) {
				return redirect(index);
			}
		} else if ((decoded.exp > current_time)) {
			if (window.location.href !== home) {
				return redirect(home);
			}
		}
	}
};

window.addEventListener("load", autoAuth2);


const redirect = (link) => {
	window.location.assign(link);
};

/**
 * @param {string} item - get local storage item
 */
const getItems = (item) => {
	return localStorage.getItem(item);
};

/**
 * Fetch apifor admin sign-up
 * @param {any} event - prevents page from submitting
 */
const signUpAdmin = (event) => {
	event.preventDefault();
	const username = document.getElementById("uname").value;
	const firstname = document.getElementById("fname").value;
	const lastname = document.getElementById("lname").value;
	const email = document.getElementById("email").value;
	const phone = document.getElementById("phone").value;
	const adminToken = document.getElementById("adminToken").value;
	const password = document.getElementById("pword").value;
	const confirmPassword = document.getElementById("repword").value;
	const disp = document.getElementById("disp-error-message");


	fetch( signupFetch , {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json"
		},
		body: JSON.stringify({
			username: username,
			firstname: firstname,
			lastname: lastname,
			email: email,
			phone: phone,
			adminToken: adminToken,
			password: password,
			confirmPassword: confirmPassword
		})
	})
		.then((res) => res.json())
		.then((data) => {
			const { token, message } = data;

			if (data.status.length === 7) {
				disp.style.color = "rgb(4, 228, 19)";
				disp.innerHTML = message;
				setTimeout(() => {
					localStorage.setItem("adminToken", token);
					window.location.assign("/dashboard");
				}, 1000);
				return;
			} else {
				disp.style.color = "red";
				disp.innerHTML = data.message;
				return;
			}
		})
		.catch(err => {
			return disp.innerHTML = err;
		});
};

signUp.addEventListener("submit", signUpAdmin);

