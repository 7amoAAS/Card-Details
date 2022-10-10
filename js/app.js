/*

[01] => Get input values
[02] => Create function to update card result from input values
[03] => Check input value it's good format or wrong format,
And show msg if it's wrong format
[04] => Show add card details msg

*/

//! Select Items
// Result
const cardNumberEl = document.getElementById("card-number");
const holderNameResultEl = document.getElementById("holder-name-result");
const expMonthEl = document.getElementById("exp-month");
const expYearEl = document.getElementById("exp-year");
const cvcEl = document.getElementById("cvc");
// Array of all form details
let allFormNums = [
	cardNumberEl,
	holderNameResultEl,
	expMonthEl,
	expYearEl,
	cvcEl,
];
// Form
const formEl = document.getElementById("card-form");
const holderNameInputEl = document.getElementById("holder-name-input");
const cardNumberInputEl = document.getElementById("card-number-input");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");
const cvcInputEl = document.getElementById("cvc-input");
const allInputs = document.querySelectorAll("input");
const submitBtn = document.getElementById("submitBtn");
// Complete message
const completeMsg = document.getElementById("complete-msg");
const completeBtn = document.getElementById("continue");

/* <---------------------------> */

//! AddEventListeners
// Complete message
// Hide form
submitBtn.addEventListener("click", confirmInfo);
completeBtn.addEventListener("click", backToForm);

/* <---------------------------> */

//! Functions
const getInputValue = value => {
	return value.value;
};

// Format input
cardNumberInputEl.addEventListener("input", e => {
	e.target.value = patternMatch({
		input: e.target.value,
		template: "xxxx xxxx xxxx xxxx",
	});
});

const updateValue = () => {
	allInputs.forEach(input => {
		input.addEventListener("input", () => {
			if (input.id == holderNameInputEl.id) {
				if (input.value.length == 0) {
					holderNameResultEl.innerText = "Jane appleseed";
				} else {
					holderNameResultEl.innerText = input.value;
				}
			} else if (input.id == cardNumberInputEl.id) {
				// Return default value
				if (input.value == "") {
					cardNumberEl.innerText = "0000 0000 0000 0000";
				}
				// Loop to check if the input valid or not
				for (let i = 0; i < input.value.length; i++) {
					// Remove any space from input value
					let inputValue = input.value.split(" ").join("");
					// Check the input is number
					if (!isNaN(inputValue)) {
						cardNumberInputEl.style = "border: 2px solid hsl(270, 3%, 87%)";
						document.querySelector(".card-number .wrong-msg").style.display =
							"none";
					} else {
						cardNumberInputEl.style = "border: 2px solid red";
						document.querySelector(".wrong-msg").style.display = "block";
					}
					// Format number result
					let regExp = /\w{0,4}/g;
					let cardNumber = input.value.match(regExp);
					cardNumberEl.innerText = cardNumber.join(" ");
				}
			} else if (input.id == monthEl.id) {
				if (input.value == "") {
					// Add red border to input
					monthEl.style = "border: 2px solid red";
					// Show wrong message
					document.querySelector(".exp-date .wrong-msg").style.display =
						"block";
				} else {
					monthEl.style = "border: 2px solid hsl(270, 3%, 87%)";
					document.querySelector(".exp-date .wrong-msg").style.display = "none";
				}
				if (input.value == "") {
					expMonthEl.innerText = "00";
				} else {
					expMonthEl.innerText = input.value;
				}
			} else if (input.id == yearEl.id) {
				if (input.value == "") {
					yearEl.style = "border: 2px solid red";
					document.querySelector(".exp-date .wrong-msg").style.display =
						"block";
				} else {
					yearEl.style = "border: 2px solid hsl(270, 3%, 87%)";
					document.querySelector(".exp-date .wrong-msg").style.display = "none";
				}
				if (input.value == "") {
					expYearEl.innerText = "00";
				} else {
					expYearEl.innerText = input.value;
				}
			} else if (input.id == cvcInputEl.id) {
				if (input.value == "") {
					document.querySelector(".cvc .wrong-msg").style.display = "block";
				} else {
					document.querySelector(".cvc .wrong-msg").style.display = "none";
				}
				if (input.value == "") {
					cvcEl.innerText = "000";
					cvcInputEl.style = "border: 2px solid red";
				} else {
					cvcEl.innerText = input.value;
					cvcInputEl.style = "border: 2px solid hsl(270, 3%, 87%)";
				}
			}
		});
	});
};
updateValue();

// Format card number
const patternMatch = ({ input, template }) => {
	try {
		let j = 0;
		let plaintext = "";
		let countj = 0;

		while (j < template.length) {
			if (countj > input.length - 1) {
				template = template.substring(0, j);
				break;
			}
			if (template[j] == input[j]) {
				j++;
				countj++;
				continue;
			}
			if (template[j] == "x") {
				template =
					template.substring(0, j) + input[countj] + template.substring(j + 1);
				plaintext = plaintext + input[countj];
				countj++;
			}
			j++;
		}
		return template;
	} catch {
		return "";
	}
};

// Complete message
function confirmInfo(e) {
	e.preventDefault();
	if (
		!holderNameInputEl.value == "" &&
		!cardNumberInputEl.value == "" &&
		cardNumberInputEl.value.length == 19 &&
		!monthEl.value == "" &&
		monthEl.value.length == 2 &&
		!yearEl.value == "" &&
		yearEl.value.length == 2 &&
		cvcInputEl.value.length == 3 &&
		!cvcInputEl.value == ""
	) {
		formEl.classList.add("hide");
		allInputs.forEach(input => {
			input.value = "";
		});

		// Show complete message
		completeMsg.classList.remove("hide");
	} else {
		alert(Error("You Must Add Your Card Details to Confirm❗"));
	}
}

// Set default values
allFormNums.forEach(e => {
	e.defaultValue = e.innerText;
});

// Back to form details
function backToForm() {
	formEl.classList.remove("hide");
	completeMsg.classList.add("hide");
	// Clear card details
	allFormNums.forEach(e => {
		e.innerText = e.defaultValue;
	});
}
/* <---------------------------> */
