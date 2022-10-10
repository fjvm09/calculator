const operatorsBtn = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const equalBtn = document.querySelector('.equal');
const numberBtn = document.querySelectorAll('.digit')
const display = document.querySelector('.display')
let valueInUse = 0;
let storedValue = 0;
let inputValue = 0;
let displayValue = 0;
let operator = '';
let result = 0;
let inputArray = [];
display.textContent = displayValue;

function add(a, b){result = a + b};
function subtract(a, b){result = a - b};
function multiply(a, b){result = a * b};
function divide(a, b){b !== 0 ? result = a / b : displayValue = 'ERROR'};

function operate(value1, value2){
    switch(operator){
        case '+':
            add(value1, value2)
            break;
        case '-':
            subtract(value1, value2)
            break;
        case '*':
            multiply(value1, value2)
            break;
        case '/':
            divide(value1, value2)
            break;
        default:
            break;
    }
}

function changeOperator(e){operator = e.textContent;}

function clear(){
    valueInUse = 0;
    displayValue = 0;
    operator = '';
    result = 0;
    storedValue = 0;
    inputValue = '';
    inputArray = [];
    display.textContent = displayValue;
}

function calculate(){
    if (inputValue == ''){return}
    if (operator == ''){
        storedValue = inputValue;
        changeOperator(this);
        inputValue = '';
        inputArray = [];
        display.textContent = displayValue;
        console.log(displayValue)
    } else {
        valueInUse = inputValue;
        operate(storedValue, valueInUse)
        displayValue = result;
        storedValue = result;
        changeOperator(this);
        inputValue = '';
        inputArray = [];
        display.textContent = displayValue;
        console.log(displayValue)
    }
}

function equalsTo(){
    if (operator == ''){return}
    if (inputValue == ''){
        operate(storedValue, valueInUse)
        displayValue = result;
        storedValue = result;
        inputArray = [];
        display.textContent = displayValue;
        console.log(displayValue)
        return;
    }
    valueInUse = inputValue;
    operate(storedValue, valueInUse)
    displayValue = result;
    storedValue = result;
    inputValue = '';
    inputArray = [];
    display.textContent = displayValue;
    console.log(displayValue)
}

function inputNumber(e){
    if (inputArray.includes('.') && this.textContent == '.'){return}
    if (inputArray.length >= 9){return}
    if (inputArray.length == 0 && this.textContent == '.'){inputArray = [0]}
    inputArray.push(this.textContent);
    displayValue = inputArray.join("")
    inputValue = parseInt(displayValue);
    display.textContent = displayValue;
    console.log(displayValue);
}

operatorsBtn.forEach(btn => btn.addEventListener('click', calculate));
clearBtn.addEventListener('click', clear);
equalBtn.addEventListener('click', equalsTo);
numberBtn.forEach(btn => btn.addEventListener('click', inputNumber));