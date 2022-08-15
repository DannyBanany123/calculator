let numbers = ["", ""];
let onNum1 = true;
let onNum2 = false;
let add = false;
let subtract = false;
let multiply = false;
let divide = false;
let operator = "";
let result = "";
let operations = `${numbers[0]} ${operator} ${numbers[1]}`;

const display = document.querySelector(".display");
const equation = display.querySelector(".equation");
const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const done = document.querySelector(".result");
const decimal = document.querySelector(".decimal");
const reset = document.querySelector(".reset");
const del = document.querySelector(".delete");

nums.forEach(num => {
    num.addEventListener("click", function(num) {
        if (onNum1) {
            numbers[0] += num.target.textContent;
            onOperator = false;
        }           
        if (onNum2) { 
            numbers[1] += num.target.textContent;
            onOperator = false;
        }
        displayEq();
    });
});

operators.forEach(op => {
    op.addEventListener("click", function(op) {
        if (numbers[0] === "" && numbers[1] === "") return;
        onNum1 = false;
        onNum2 = true;
        operator = op.target.textContent;
        displayEq();
    })
});

equal.addEventListener("click", () => {
    if (numbers[1] === "") return;
    let equals;
    if (operator === "+") {
        equals = addition();
    } else if (operator === "-") {
        equals = subtraction();
    } else if (operator === "x") {
        equals = multiplication();
    } else if (operator === "/") {
        equals = division();
    }
    result = equals;
    done.textContent = result;
    numbers[0] = result;
    numbers[1] = "";
    onNum1 = true;
    onNum2 = false;
});

reset.addEventListener("click", () => {
    numbers = ["", ""];
    onNum1 = true;
    onNum2 = false;
    add = false;
    subtract = false;
    multiply = false;
    divide = false;
    operator = "";
    result = "";
    operations = `${numbers[0]} ${operator} ${numbers[1]}`;
    displayEq();
    done.textContent = "";
});

del.addEventListener("click", () => {
    if (onNum2 === false && numbers[0] === result) return;
    if (onNum2 === true && numbers[1] !== "") {
        numbers[1] = numbers[1].substring(0, numbers[1].length - 1);
    } else if (onNum2 === true && numbers[1] === "") {
        operator = "";
        onNum2 = false;
        onNum1 = true;
    } else if (onNum1 === true && operator === "") {
        numbers[0] = numbers[0].substring(0, numbers[0].length - 1);
    }
    displayEq();
    done.textContent = "";
});

function displayEq() {
    operations = `${numbers[0]} ${operator} ${numbers[1]}`;
    equation.textContent = operations;
    console.log(`number1: ${numbers[0]}, number2: ${numbers[1]}`);
}

function addition() {
    return +numbers[0] + +numbers[1];
}

function subtraction () {
    return +numbers[0] - +numbers[1];
}

function multiplication() {
    return +numbers[0] * +numbers[1];
}

function division() {
    return +numbers[0] / +numbers[1];
}
