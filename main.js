const numbers = ["", ""];
let onNum1 = true;
let onNum2 = false;
let needResult = true;
let add = false;
let subtract = false;
let multiply = false;
let divide = false;
let operator = "";
let operations = `${numbers[0]} ${operator} ${numbers[1]}`;

const display = document.querySelector(".display");
const equation = display.querySelector(".equation");
const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");

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
        onNum1 = false;
        onNum2 = true;
        operator = op.target.textContent;
        displayEq();
    })
});

function displayEq() {
    operations = `${numbers[0]} ${operator} ${numbers[1]}`;
    equation.textContent = operations;
    console.log(`number1: ${numbers[0]}, number2: ${numbers[1]}`);
}