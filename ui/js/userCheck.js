const index = "http://localhost:7000/";
const home = "http://localhost:7000/home";
const products = "http://localhost:7000/products";
const about = "http://localhost:7000/about";

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


