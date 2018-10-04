const adminIndex = "http://localhost:7000/admin";
const dashboard = "http://localhost:7000/dashboard";


const adminTokenCheck = window.localStorage.getItem("adminToken");

//checks if token is valid
const autoAuth1 = () => {
	if (getItems1("adminToken") !== null) {
		let current_time = new Date().getTime();
		current_time = parseInt(current_time / 1000);
		const decoded = jwt_decode(adminTokenCheck);

		if ((current_time > decoded.exp)) {
			if (window.location.href !== adminIndex) {
				return redirect1(adminIndex);
			}
		} else if ((decoded.exp > current_time) && (typeof getItems1(adminTokenCheck) !== undefined)) {
			if (window.location.href !== dashboard) {
				return redirect1(dashboard);
			}
		}
	}

	if ((getItems1("adminToken") === null)) {
		if (window.location.href !== adminIndex) {
			return redirect1(adminIndex);
		}
	}
};


const redirect1 = (link) => {
	window.location.href = link;
};

const getItems1 = (item) => {
	return localStorage.getItem(item);
};

autoAuth1();

