const loginForm = document.getElementById("login-form");

const loginUser = (event) => {
	event.preventDefault();

	const email = document.getElementById("login-email").value;
	const password = document.getElementById("login-pword").value;
	const disp = document.getElementById("disp-error-message1");


	fetch("http://localhost:7000/api/v2/auth/login", {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json"
		},
		body: JSON.stringify({
			email: email,
			password: password,
		})
	})
		.then((res) => res.json())
		.then((data) => {
			disp.innerHTML = data.status;
			const { token, fullname } = data;
			if (data.status.length === 7) {
				disp.style.color = "rgb(4, 228, 19)";
				disp.innerHTML = data.message;
				setTimeout(() => {
					localStorage.clear();
					localStorage.setItem("token", token);
					localStorage.setItem("fullname", fullname);
					window.location.assign("/home");
				}, 3000);
				return;
			} else {
        disp.style.backgroundColor = "white";
				disp.style.color = "red";
				disp.innerHTML = data.message;
			}
		})
		.catch(err => console.log(err));
};

loginForm.addEventListener("submit", loginUser);


