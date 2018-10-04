const logoutAdmin = document.getElementById("logout-admin");
const token1 = window.localStorage.getItem("adminToken");

const index1 = "https://f-cube.herokuapp.com/admin";

/**
 * Redirect user
 * @param {string} link - link or url
 */
const redirect = (link) => {
	window.location.href = link;
};

const getItems = (item) => {
	return localStorage.getItem(item);
};

/**
 * Change users logged_in status to false
 */
const logOutUser = () => {

	fetch("https://f-cube.herokuapp.com/api/v2/admin/logout", {
		method: "POST",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-type": "application/json",
			"authorization": token1
		}
	})
		.then((res) => res.json())
		.then(() => { })
		.catch(err => {
			return console.log(err);
		});
};

logoutAdmin.addEventListener("click", logOutUser);

/**
 * Logout user
 */
const logoutUser = () => {
	let check = confirm("Are You Sure?");
	if (check) {
		window.localStorage.removeItem("adminToken");
		redirect(index1);
	}
};
logoutAdmin.addEventListener("click", logoutUser);

window.onload = () => {
	let name = document.getElementById("admin-welcome");
	name.style.color = "#ff3008";
	name.style.textShadow = "0.5px 0.5px 0.5px white";
	name.style.width = "100%";
	name.style.textAlign = "center";
	name.style.marginTop = "1%";

	const decode = jwt_decode(getItems("adminToken"));

	name.innerHTML = `Welcome ${decode.username}`;
};





