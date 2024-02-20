function add(num1, num2) {
    return Math.round(((num1 + num2) + Number.EPSILON) * 10000000) / 10000000;
}

function subtract(num1, num2) {
    return Math.round(((num1 - num2) + Number.EPSILON) * 10000000) / 10000000;
}

function multiply(num1, num2) {
    return Math.round(((num1 * num2) + Number.EPSILON) * 10000000) / 10000000;
}

function divide(num1, num2) {
    return num2 === 0 ? "Nope" : Math.round(((num1 / num2) + Number.EPSILON) * 10000000) / 10000000;
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

function operationHandler(x, y, operator) {
    let result = operate(x, y, operator);
    changeDisplay(result);
    // Referring to the global variables
    num1 = result;
    num2 = operator = "";
}

let num1 = "";
let num2 = "";
let operator = "";

const numberButtons = document.querySelectorAll(".numbers button");
numberButtons.forEach(button => button.addEventListener("click", (event) => {
    // If no operator has been selected, then all number inputs must be related to num1
    if (operator === "") {
        num1 += event.target.textContent;
        changeDisplay(num1);
    }
    else {
        num2 += event.target.textContent;
        changeDisplay(num2);
    }
}));

const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach(button => button.addEventListener("click", (event) => {
    switch (event.target.textContent) {
        case "AC":
            num1 = num2 = operator = "";
            changeDisplay(0);
            break;
        case "=":
            operationHandler(Number(num1), Number(num2), operator);
            break;
        default:
            // If num2 has been entered, then complete the initial operation and then start the next using the result as num1
            // This does not preserve order of operations, as expected in the specification
            if (num2 !== "") {
                operationHandler(Number(num1), Number(num2), operator);
            }
            operator = event.target.textContent;
    }
}));