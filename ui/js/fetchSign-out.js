const logout = document.getElementById("logout");
const token = window.localStorage.getItem("token");

const index = "http://localhost:7000/";
const home = "http://localhost:7000/home";

//checks if token is valid
const autoAuth1 = () => {
	if (getItems("token") !== null){
		let current_time = new Date().getTime();
		current_time = parseInt(current_time / 1000);
		const decoded = jwt_decode(token);

		if ((current_time > decoded.exp)) {
			if (window.location.href !== index) {
				return redirect(index);
			}
		} else if ((decoded.exp > current_time) && (typeof getItems(token) !== undefined)) {
			if (window.location.href !== home) {
				return redirect(home);
			}
		}
	}

	if ((getItems("token") === null)){
		if (window.location.href !== index) {
			return redirect(index);
		}
	}
};

window.addEventListener("load", autoAuth1);

const redirect = (link) => {
	window.location.assign(link);
};

const getItems = (item) => {
	return localStorage.getItem(item);
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

logout.addEventListener("click", logOutUser);


const logoutUser = () => {
	let check = confirm("DO YOU WANT TO LOGOUT?");
	if (check) {
		window.localStorage.clear();
		redirect(index);
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

	const decode = jwt_decode(getItems("token"));

	name.innerHTML = `Welcome ${decode.fullname}`;
};





