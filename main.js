let numbers = ["", ""];
let onNum1 = true;
let onNum2 = false;
let decimalOne = false;
let decimalTwo = false;
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
    num.addEventListener("click", () => appendNum(num));
});    

function appendNum(num) {
    if (onNum1) {
        if (numbers[0] === result) {
            operator = "";
            done.textContent = "";
        }
        if (typeof num === "string") {
            numbers[0] += num;
        } else {
            numbers[0] += num.textContent;
        }
    }           
    if (onNum2) { 
        if (typeof num === "string") {
            numbers[1] += num;
        } else {
            numbers[1] += num.textContent;
        }
    }
    displayEq();
}

operators.forEach(op => {
    op.addEventListener("click", () => addOperator(op));
});

function addOperator(op) {
    if (numbers[0] === "" && numbers[1] === "") return;
    onNum1 = false;
    onNum2 = true;
    if (typeof op === "string") {
        operator = op;
    } else {
        operator = op.textContent;
    }
    displayEq();
}

equal.addEventListener("click", calculate);

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

del.addEventListener("click", back);

decimal.addEventListener("click", addDecimal);

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

function calculate() {
    if (numbers[1] === "") return;
    let equals;
    if (operator === "+") {
        equals = addition();
    } else if (operator === "-") {
        equals = subtraction();
    } else if (operator === "x") {
        equals = multiplication();
    } else if (operator === "/") {
        if (numbers[1] === 0) {
            alert("Cannot divide by 0");
            return;
        }
        equals = division();
    }
    result = equals;
    // Round to 3 decimal places if using floating point numbers
    if (result.toString().includes(".")) result = result.toFixed(3);
    done.textContent = result;
    numbers[0] = result;
    numbers[1] = "";
    onNum1 = true;
    onNum2 = false;
}

function back() {
    // if (onNum2 === false && numbers[0] === result) return;
    console.log(onNum1, onNum2);
    if (onNum2 === true && numbers[1] !== "") {
        numbers[1] = numbers[1].substring(0, numbers[1].length - 1);
    } else if (numbers[1] === "" && operator !== "") {
        operator = "";
        onNum2 = false;
        onNum1 = true;
    } else if (onNum1 === true && operator === "") {
        numbers[0] = numbers[0].toString().substring(0, numbers[0].toString().length - 1);
    }
    displayEq();
    done.textContent = "";
}

function addDecimal() {
    if (done.textContent !== "") return;
    if (onNum1 && !numbers[0].includes(".") && operator === "") numbers[0] += ".";
    if (onNum2 && !numbers[1].includes(".")) numbers[1] += ".";
    displayEq();
}

// Keyboard support
document.addEventListener("keyup", function(e) {
    let numberBank = "1234567890";
    let operatorBank = "+-/x";
    if (operatorBank.includes(e.key)) addOperator(e.key);
    if (numberBank.includes(e.key)) appendNum(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") back();
    if (e.key === ".") addDecimal();
});