function add(num1, num2) {
    return roundSevenDP((num1 + num2));
}

function subtract(num1, num2) {
    return roundSevenDP((num1 - num2));
}

function multiply(num1, num2) {
    return roundSevenDP((num1 * num2));
}

function divide(num1, num2) {
    return num2 === 0 ? "Nope" : roundSevenDP((num1 / num2));
}

function roundSevenDP(number) {
    return Math.round((number + Number.EPSILON) * 10000000) / 10000000;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}

function changeDisplay(number) {
    let display = document.querySelector(".display");
    display.textContent = number;
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

const numberButtons = document.querySelectorAll(".numbers button");
numberButtons.forEach(button => button.addEventListener("click", (event) => {
    // If no operator has been selected, then all number inputs must be related to the first number
    if (operator === "") {
        // If the type of the first number is number, that means the currently displayed number is the result of an operationHandler call
        // If that is the case, we don't want to concatenate that number, we want to replace it completely
        num1 = (typeof num1 === "number") ? event.target.textContent : num1 + event.target.textContent;
        changeDisplay(num1);
    } 
    else {
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

const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach(button => button.addEventListener("click", (event) => {
    switch (event.target.textContent) {
        case "AC":
            num1 = num2 = operator = "";
            changeDisplay(0);
            break;
        case "=":
            // Only carry out the operation if all required values have been entered
            if (num1 !== "" && num2 !== "" && operator !== "") operationHandler(Number(num1), Number(num2), operator);
            break;
        default:
            // Don't acknowledge any +, -, × or ÷ clicks unless at least one number has been entered
            if (num1 !== "") {
                // If num2 has been entered, then complete the initial operation and then start the next using the result as num1
                // This does not preserve order of operations aligning with the specification
                if (num2 !== "") operationHandler(Number(num1), Number(num2), operator);
                operator = event.target.textContent;
            }
    }
}));