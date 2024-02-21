function add(num1, num2) {
    let result = num1 + num2;
    // If result is too large for the display, return it in exponential form
    return (result.toString().length > 9) ? result.toExponential(3) : result;
}

function subtract(num1, num2) {
    let result = num1 - num2;
    return (result.toString().length > 9) ? result.toExponential(3) : result;
}

function multiply(num1, num2) {
    let result = num1 * num2;
    return (result.toString().length > 9) ? result.toExponential(3) : result;
}

function divide(num1, num2) {
    let result = (num2 === 0) ? "Nope" : num1 / num2;
    return (result.toString().length > 9) ? result.toExponential(3) : result;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "−":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}

function changeDisplay(number) {
    let display = document.querySelector(".display");
    display.textContent = (number === "") ? "0" : number;
}

function operationHandler(x, y, currentOperator) {
    // Referring to the global variables
    num1 = operate(x, y, currentOperator);
    num2 = operator = "";
    
    changeDisplay(num1);
}

let num1 = "";
let num2 = "";
let operator = "";

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => button.addEventListener("click", (event) => {
    // If no operator has been selected, then all number inputs must be related to the first number
    if (operator === "") {
        // Checking the length prevents the number from overfilling the display div
        // Eight leaves enough room for a decimal point and negation if they choose
        if (num1.toString().length < 8) {
            // If the type of the first number is number, that means the currently displayed number is the result of an operationHandler call
            // If that is the case, we don't want to concatenate that number, we want to replace it completely
            num1 = (typeof num1 === "number") ? event.target.textContent : num1 + event.target.textContent;
            changeDisplay(num1);
        }
    } 
    else if (num2.length < 8) {
        num2 += event.target.textContent;
        changeDisplay(num2);
    }
}));

const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", (event) => {
        // If no operator has been selected, then all number inputs must be related to the first number
        if (operator === "") {
            // If the decimal point is the first selection for the first number, include a preceeding 0 for aesthetic and math purposes
            if (typeof num1 === "number" || num1 === "") {
                num1 = "0" + event.target.textContent;
            } 
            // If the first number already contains a decimal point do nothing
            else if (num1.includes(".")) {
                return;
            }
            else {
                num1 += event.target.textContent;
            }
            changeDisplay(num1);
        } 
        else {
            if (num2 === "") {
                num2 = "0" + event.target.textContent;
            }
            else if (num2.includes(".")) {
                return;
            } 
            else {
                num2 += event.target.textContent;
            }
            changeDisplay(num2);
        }
});

const buttons = document.querySelectorAll("button");
// If any button is selected, the previous selected operator is no longer active
buttons.forEach(button => button.addEventListener("click", (event) => {
    // If the clicked button is the = or +/- button, then the active operator is still active
    if (event.target.textContent !== "=" && event.target.textContent !== "+/−") operatorButtons.forEach(button => button.classList.remove("active-operator"));
}));

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => button.addEventListener("click", (event) => {
    // If an operator button is pressed, highlight it as active
    event.target.classList.add("active-operator");

    if (num1 !== "") {
        // If num2 has been entered, then complete the initial operation and then start the next using the result as num1
        // This does not preserve order of operations aligning with the specification
        if (num2 !== "") operationHandler(Number(num1), Number(num2), operator);
        operator = event.target.textContent;
    }
    // If a first number hasn't been entered, then the user must want to use the displayed number of "0"
    else {
        num1 = "0";
        operator = event.target.textContent;
    }
}));

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
    // Only carry out the operation if all required values have been entered
    if (num1 !== "" && num2 !== "" && operator !== "") operationHandler(Number(num1), Number(num2), operator);
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    num1 = num2 = operator = "";
    changeDisplay(0);
});

const delButton = document.querySelector(".delete");
delButton.addEventListener("click", () => {
    // If the displayed number is a result, do nothing
    if (typeof num1 === "number") {
        return;
    }
    // In this case, we are dealing with the first number (even if we have selected an operator)
    else if (num2 === "") {
        // If the number contains a negative symbol and is only two characters long, delete both the negative symbol and the remaining digit
        num1 = (num1.length === 2 && num1.includes("-")) ? "" : num1.substring(0, num1.length - 1);
        changeDisplay(num1);
        // Get rid of operator selection if the delete button has been pressed immediately after clicking an operator
        operator = "";
    }
    else {
        num2 = (num2.length === 2 && num2.includes("-")) ? "" : num2.substring(0, num2.length - 1);
        changeDisplay(num2);
    }
});

const negativeButton = document.querySelector(".negative");
negativeButton.addEventListener("click", () => {
    // Prevents "0" from being appended to start of number string
    if (num1 !== "" && operator === "") {
        let negative = Number(num1) * -1;
        // If the number is too long to properly display, display it in exponential notation
        num1 = (negative.toString().length > 9) ? negative.toExponential(3).toString() : negative.toString();
        changeDisplay(num1);
    }
    else if (num2 !== "") {
        num2 = (Number(num2) * -1).toString();
        changeDisplay(num2);
    }
});