const signUp = document.getElementById("signup-form");
const token = window.localStorage.getItem("token");

const index = "http://localhost:7000/";
const home = "http://localhost:7000/home";



//checks if token is valid
const autoAuth2 = () => {
	if ((getItems("token") !== null)) {
		let current_time = new Date().getTime();
		current_time = parseInt(current_time / 1000);
		const decoded = jwt_decode(token);

		if ((current_time > decoded.exp) || (getItems("token") === null)) {
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

const getItems = (item) => {
	return localStorage.getItem(item);
};

const signUpUser = (event) => {
	event.preventDefault();

	const firstname = document.getElementById("fname").value;
	const lastname = document.getElementById("lname").value;
	const email = document.getElementById("email").value;
	const phone = document.getElementById("phone").value;
	const password = document.getElementById("pword").value;
	const confirmPassword = document.getElementById("repword").value;
	const disp = document.getElementById("disp-error-message");


  fetch("http://localhost:7000/api/v2/auth/signup", {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json"
		},
		body: JSON.stringify({
			firstname: firstname,
			lastname: lastname,
			email: email,
			phone: phone,
			password: password,
			confirmPassword: confirmPassword
		})
	})
		.then((res) => res.json())
		.then((data) => {
			disp.innerHTML = data.status;
			const { token } = data;
			if (data.status.length === 7){
				disp.style.color = "rgb(4, 228, 19)";
				disp.innerHTML = data.message;
				setTimeout(() => {
					localStorage.setItem("token", token);
					window.location.assign("/home");
				}, 1000);
				return;
			} else {
				disp.style.backgroundColor = "white";
				disp.style.color = "red";
				disp.innerHTML = data.message;
				return;
			}
		})
		.catch(err => {
			return disp.innerHTML= err;
		});
};

signUp.addEventListener("submit", signUpUser);

