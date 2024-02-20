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

function changeDisplay(number) {
    let display = document.querySelector(".display");
    display.textContent = number;
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
            num1 = "";
            num2 = "";
            operator = "";
            changeDisplay(0);
            break;
        case "=":
            let result = operate(Number(num1), Number(num2), operator);
            changeDisplay(result);
            break;
        default:
            operator = event.target.textContent;
    }
}));