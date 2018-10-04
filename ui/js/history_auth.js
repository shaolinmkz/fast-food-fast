const index = "https://f-cube.herokuapp.com/";
const products = "https://f-cube.herokuapp.com/products";
const about = "https://f-cube.herokuapp.com/about";


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




