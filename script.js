const operatorsBtn = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const equalBtn = document.querySelector('.equal');
const numberBtn = document.querySelectorAll('.digit')
const display = document.querySelector('.display')
const percentageBtn = document.querySelector('.percentage');
const undoBtn = document.querySelector('.undo');
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
function divide(a, b){b !== 0 ? result = a / b : result = 'ERROR'};

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
    operator = '';
    result = 0;
    storedValue = '';
    inputValue = '';
    inputArray = [];
    display.textContent = result;
}

function calculate(){
    if (operator == ''){
        storedValue = inputValue;
        inputValue = ''
        inputArray = [];
        display.textContent = displayValue;
    } else if (storedValue !== "" && operator !== "" && inputValue !== ""){
        valueInUse = inputValue;
        operate(storedValue, valueInUse)
        roundResult()
        storedValue = result;
        inputValue = ''
        inputArray = [];
        display.textContent = result;
    }
    else {
        return;
    }
}

function equalsTo(){
    if (operator == ''){return}
    if (inputValue == ''){
        operate(storedValue, valueInUse)
        roundResult()
        storedValue = result;
        inputValue = ''
        inputArray = [];
        display.textContent = result;
        return;
    }
    valueInUse = inputValue;
    operate(storedValue, valueInUse)
    roundResult()
    storedValue = result;
    inputValue = ''
    inputArray = [];
    display.textContent = result;
}

function inputNumber(e){
    if (inputArray.includes('.') && this.textContent == '.'){return}
    if (inputArray.length >= 9){return}
    if (inputArray.length == 0 && this.textContent == '.'){inputArray = [0]}
    inputArray.push(this.textContent);
    displayValue = inputArray.join("")
    inputValue = parseInt(displayValue);
    display.textContent = displayValue;
}

function roundResult(){
    if(result > 999999999){result = 999999999}
    else if(result < 0.0000001 && result > 0){result = 0}
    else if(result < 0 && result > -0.0000001){result = 0}
    else if(result < -99999999)(result = -99999999)
    let roundArray = result.toString().split("")
    if (roundArray.length > 9){
        roundArray.splice(9)
        result = roundArray.join("")
    };
} 

function doTheMath(){
    calculate()
    changeOperator(this)
}

function percentage(){
    if (storedValue == ''){storedValue = inputValue};
    divide(storedValue, 100)
    roundResult()
    storedValue = result;
    inputValue = ''
    inputArray = [];
    display.textContent = result;
}

function undo(){
    if (inputArray = []) {return};
    inputArray.splice(-1, 1);
    displayValue = inputArray.join("")
    inputValue = parseInt(displayValue);
    display.textContent = displayValue;
}

operatorsBtn.forEach(btn => btn.addEventListener('click', doTheMath));
clearBtn.addEventListener('click', clear);
equalBtn.addEventListener('click', equalsTo);
numberBtn.forEach(btn => btn.addEventListener('click', inputNumber));
percentageBtn.addEventListener('click', percentage)
undoBtn.addEventListener('click', undo)