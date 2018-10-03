const index = "https://f-cube.herokuapp.com/";
const home = "https://f-cube.herokuapp.com/home";
const products = "https://f-cube.herokuapp.com/products";
const about = "https://f-cube.herokuapp.com/about";

const token = window.localStorage.getItem("token");

//checks if token is valid
const autoAuth1 = () => {
	if (getItems1("token") !== null) {
		let current_time = new Date().getTime();
		current_time = parseInt(current_time / 1000);
		const decoded = jwt_decode(token);

		if ((current_time > decoded.exp)) {
			if (window.location.href !== index || window.location.href !== products || window.location.href !== about) {
				return redirect1(index);
			}
		} else if ((decoded.exp > current_time) && (typeof getItems1(token) !== undefined)) {
			if (window.location.href !== home) {
				return redirect1(home);
			}
		}
	}

	if ((getItems1("token") === null)) {
		if (window.location.href !== index) {
			return redirect1(index);
		}
	}
};

window.addEventListener("load", autoAuth1);


const redirect1 = (link) => {
	window.location.assign(link);
};

const getItems1 = (item) => {
	return localStorage.getItem(item);
};


