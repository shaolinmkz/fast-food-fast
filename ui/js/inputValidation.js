const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const pword = document.getElementById("pword");
const uname = document.getElementById("uname");
const repword = document.getElementById("repword");
const disp = document.getElementById("disp-error-message");
const inputFields = document.getElementsByName("signup-form");


/**
 * Signup input validation
 */
const signupValidation = () => {
	disp.style.color = "rgb(255, 45, 45)";
	disp.style.fontFamily = "Arial, Helvetica, sans-serif";
	if (fname.value === "") {
		disp.innerHTML = "Please enter a firstname";
		setTimeout(() => disp.style.color = "rgba(255, 45, 45,0)", 2000);
		return;
	} else if (lname.value === "") {
		disp.innerHTML = "Please enter a lastname";
		setTimeout(() => disp.style.color = "rgba(255, 45, 45,0)", 2000);
		return;
	} else if (email.value === "") {
		disp.innerHTML = "Please enter a valid email";
		setTimeout(() => disp.style.color = "rgba(255, 45, 45,0)", 2000);
		return;
	} else if (phone.value === "") {
		disp.innerHTML = "Please enter your mobile number";
		setTimeout(() => disp.style.color = "rgba(255, 45, 45,0)", 2000);
		return;
	} else if (phone.value.length !== 11) {
		disp.innerHTML = "Invalid phone number";
		setTimeout(() => disp.style.color = "rgba(255, 45, 45,0)", 2000);
		return;
	} else if ((pword.value === "") || (repword.value === "")) {
		disp.innerHTML = "Please enter a password";
		setTimeout(() => disp.style.color = "rgba(255, 45, 45,0)", 2000);
		return;
	} else if ((pword.value).length < 6) {
		disp.innerHTML = "Minimum password length is 6";
		setTimeout(() => disp.style.color = "rgba(255, 45, 45,0)", 2000);
		return;
	}
};

const userSignup = () => {
	signupValidation();
};

inputFields.forEach((input) => {
	input.addEventListener("input", userSignup);
});

/**
 * Admin
 */
const checkAdmin = () => {
	if (uname.value === "") {
		disp.innerHTML = "Username is required";
		setTimeout(() => disp.style.color = "rgba(255, 45, 45,0)", 2000);
	}
};

if (window.location.href === "https://f-cube.herokuapp.com/admin") {
	uname.addEventListener("input", checkAdmin);
}
/**
 * Password strength tester
 */
const testPasswordStrength = () => {
	const alphaLow = "abcdefghijklmnopqrstuvwxyz";
	const alphaCaps = alphaLow.toUpperCase();
	const num = "0123456789";
	const symbols = "!@#$%^&*()_+-={}]['\"\\;:,./<?>~";
	let i, j, testSum;

	if (pword.value === "") {
		return disp.innerHTML = "";
	}

	const testAlphaLow = () => {
		for (i = 0; i < (pword.value).length; i++) {
			for (j = 0; j < (alphaLow.length); j++) {
				if ((pword.value).charAt(i) === alphaLow.charAt(j)) {
					return 25;
				}
			}
		}
		return 0;
	};


	const testAlphaCaps = () => {
		for (i = 0; i < (pword.value).length; i++) {
			for (j = 0; j < (alphaCaps.length); j++) {
				if ((pword.value).charAt(i) === alphaCaps.charAt(j)) {
					return 25;
				}
			}
		}
		return 0;
	};

	const testNum = () => {
		for (i = 0; i < (pword.value).length; i++) {
			for (j = 0; j < (num.length); j++) {
				if ((pword.value).charAt(i) === num.charAt(j)) {
					return 25;
				}
			}
		}
		return 0;
	};

	const testSymbols = () => {
		for (i = 0; i < (pword.value).length; i++) {
			for (j = 0; j < (symbols.length); j++) {
				if ((pword.value).charAt(i) === symbols.charAt(j)) {
					return 25;
				}
			}
		}
		return 0;
	};

	testSum = testAlphaLow() + testAlphaCaps() + testNum() + testSymbols();
	if (testSum < 50) {
		disp.style.color = "red";
	} else if (testSum >= 50 && testSum < 75) {
		disp.style.color = "yellow";
	} else if (testSum === 75) {
		disp.style.color = "rgb(148, 216, 47)";
	} else {
		disp.style.color = "rgb(4, 228, 19)";
	}
	return disp.innerHTML = `Password Strength is ${testSum}%`;
};

pword.oninput = () => {
	testPasswordStrength();
};


