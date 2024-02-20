function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
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

let num1 = null;
let num2 = null;
let operator = null;

const numberButtons = document.querySelectorAll(".numbers button");
numberButtons.forEach(button => button.addEventListener("click", (event) => {
    if (num1 === null) {
        num1 = Number(event.target.textContent);
    }
    else {
        num2 = Number(event.target.textContent);
    }
}));

const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach(button => button.addEventListener("click", (event) => {
    switch (event.target.textContent) {
        case "AC":
            break;
        case "=":
            console.log(operate(num1, num2, operator));
            break;
        default:
            operator = event.target.textContent;
    }
}));