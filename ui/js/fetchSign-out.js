const logout = document.getElementById("logout");
const tokenCheck = window.localStorage.getItem("token");

const indexRedirect = "https://f-cube.herokuapp.com/";

const redirect = (link) => {
	window.location.assign(link);
};

const getItems = (item) => {
	return localStorage.getItem(item);
};

const logOutUser = () => {

  fetch("https://f-cube.herokuapp.com/api/v2/logout", {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"authorization": tokenCheck
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
		window.localStorage.removeItem("token");
		redirect(indexRedirect);
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





