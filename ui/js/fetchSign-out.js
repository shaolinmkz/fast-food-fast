const logout = document.getElementById("logout");
const signUp = document.getElementById("signup-form");
const token = window.localStorage.getItem("token");

//checks if token is valid

const autoAuth1 = () => {
	let current_time = new Date().getTime();
	current_time = parseInt(current_time / 1000);
	const decoded = jwt_decode(token);
  console.log(token.iat - current_time);

	if ((current_time > decoded.iat) && (token === undefined)) {
		alert("Session expired, you need to login");
    redirect("http://localhost:7000/index.html");
	} else if (decoded.iat > current_time) {
    redirect("http://localhost:7000/home.html");
	}
};
window.addEventListener("load", autoAuth1);

const redirect = (link) => {
	window.location.assign(link);
};

const logOutUser = () => {

	fetch("http://localhost:7000/api/v2/logout", {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"authorization": token
		}
	})
		.then((res) => res.json())
		.then(() => {})
		.catch(err => {
			return console.log(err);
		});
};

signUp.addEventListener("submit", logOutUser);


const logoutUser = () => {
	let check = confirm("DO YOU WANT TO LOGOUT?");
	if (check) {
		window.localStorage.clear();
		window.location.assign("/index");
	}
};
logout.addEventListener("click", logoutUser);

window.onload = () => {
	let name = document.getElementById("user-welcome");
	name.style.color = "#ff3008";
	name.style.textShadow = "0.5px 0.5px 0.5px white";
	name.style.width = "100%";
	name.style.textAlign = "center";
	name.style.marginTop = "1%";

	name.innerHTML = `Welcome ${localStorage.getItem("fullname")}`;
};





