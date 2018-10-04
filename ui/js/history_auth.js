const index = "http://localhost:7000/";
const products = "http://localhost:7000/products";
const about = "http://localhost:7000/about";


//checks if token is valid
const historyAuth = () => {
	if (localStorage.getItem("token") !== null) {
		let current_time = new Date().getTime();
		current_time = parseInt(current_time / 1000);
		const decoded = jwt_decode(localStorage.getItem("token"));

		if ((current_time > decoded.exp)) {
			if (window.location.href !== index || window.location.href !== products || window.location.href !== about) {
				return redirect1(index);
			}
		}
	}

	if ((localStorage.getItem("token") === null)) {
		if (window.location.href !== index) {
			return redirect1(index);
		}
	}
};


const redirect1 = (link) => {
	window.location.assign(link);
};

historyAuth();




