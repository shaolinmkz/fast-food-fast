const loginForm = document.getElementById("login-form");
const signinFetch = "https://f-cube.herokuapp.com/api/v2/auth/admin/login";

const loginAdmin = (event) => {
	event.preventDefault();

	const username = document.getElementById("login-uname").value;
	const password = document.getElementById("login-pword").value;
	const disp = document.getElementById("disp-error-message1");


	fetch( signinFetch, {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json"
		},
		body: JSON.stringify({
      username: username,
			password: password,
		})
	})
		.then((res) => res.json())
		.then((data) => {
			disp.innerHTML = data.status;
			const { token, message } = data;
			if (data.status.length === 7) {
				disp.style.color = "rgb(4, 228, 19)";
				disp.innerHTML = message;
				setTimeout(() => {
					localStorage.setItem("adminToken", token);
          window.location.href = "https://f-cube.herokuapp.com/dashboard";
				}, 1000);
				return;
			} else {
				disp.style.color = "red";
				disp.innerHTML = data.message;
			}
		})
		.catch(err => console.log(err));
};

loginForm.addEventListener("submit", loginAdmin);


