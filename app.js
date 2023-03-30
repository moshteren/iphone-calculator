const inputScreen = document.querySelector('#input-screen');
const buttons = document.querySelectorAll('.button');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const plusMinus = document.querySelector('#plus-minus');
let currentValue;
let prevValue;
let currentOperator;
let lastButton;
let memory = {
    value: undefined,
    operator: undefined
};
let isResultDisplayed = false;

const updateInputScreen = () => {
    inputScreen.innerHTML = currentValue;
}

const nextOperand = () => {
    if (currentValue) {
        prevValue = currentValue;
        currentValue = undefined;
    } else {       
        prevValue = 0;
    }
    console.log(`prev: ${prevValue} - curr: ${currentValue}`);
}

const clearMemory = () => {
    memory.value = undefined;
    memory.operator = undefined;
}

const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
        case 'add':
            console.log(`${firstValue} + ${secondValue} = ${firstValue + secondValue}`);
            return firstValue + secondValue;
        case 'subtract':
            console.log(`${firstValue} - ${secondValue} = ${firstValue - secondValue}`);
            return firstValue - secondValue;
        case 'multiply':
            console.log(`${firstValue} * ${secondValue} = ${firstValue * secondValue}`);
            return firstValue * secondValue;
        case 'divide':
            console.log(`${firstValue} / ${secondValue} = ${firstValue / secondValue}`);
            return firstValue / secondValue;
    }
}

for (number of numbers) {
    number.addEventListener('click', (e) => {
        if (!currentValue) {
            currentValue = parseInt(e.target.innerHTML);
        } else {
            currentValue = currentValue * 10 + parseInt(e.target.innerHTML);
        }
    
        if (isResultDisplayed) {
            currentValue = parseInt(e.target.innerHTML);
            isResultDisplayed = false;
        }
        updateInputScreen();
    })
}

add.addEventListener('click', () => {
    if (prevValue != undefined) {
        currentValue = calculate(prevValue, currentValue, currentOperator);
    }
    
    if (memory.value != undefined) {
        currentValue = calculate(memory.value, currentValue, memory.operator);
        clearMemory();
    }
    updateInputScreen();
    
    currentOperator = 'add';
    
    nextOperand();
})

subtract.addEventListener('click', () => {
    if (prevValue != undefined) {
        currentValue = calculate(prevValue, currentValue, currentOperator);
    }
    
    if (memory.value != undefined) {
        currentValue = calculate(memory.value, currentValue, memory.operator);
        clearMemory();
    }
    updateInputScreen();
    
    currentOperator = 'subtract';
    
    nextOperand();
})

divide.addEventListener('click', () => {
    if (currentOperator === 'add' || currentOperator === 'subtract') {
        memory.value = prevValue;
        memory.operator = currentOperator;
        prevValue = undefined;
    } else if (prevValue != undefined) {
        currentValue = calculate(prevValue, currentValue, currentOperator);
        updateInputScreen();
    }
    
    currentOperator = 'divide';
    
    nextOperand();
})

multiply.addEventListener('click', () => {
    if (currentOperator === 'add' || currentOperator === 'subtract') {
        memory.value = prevValue;
        memory.operator = currentOperator;
        prevValue = undefined;
    } else if (prevValue != undefined) {
        currentValue = calculate(prevValue, currentValue, currentOperator);
        updateInputScreen();
    }
    
    currentOperator = 'multiply';
    
    nextOperand();
})

equal.addEventListener('click', (e) => {
    if (lastButton.classList[1] === 'operators' && currentValue === 0) {
        currentValue = prevValue;  
    }
    if (prevValue != undefined) {
        currentValue = calculate(prevValue, currentValue, currentOperator);
    }
    
    
    if (memory.value != undefined) {
        currentValue = calculate(memory.value, currentValue, memory.operator);
        clearMemory();
    }
    
    prevValue = undefined;
    updateInputScreen();
    isResultDisplayed = true;
})

clear.addEventListener('click', (e) => {
    if (currentValue) {
        currentValue = 0;
    } else {
        clearMemory();
        prevValue = undefined;
        isResultDisplayed = undefined;
    }   
    updateInputScreen();
})

for (button of buttons) {
    button.addEventListener('click', (e) => {
        if (!currentValue) {
            currentValue = 0;
        }
        
        lastButton = e.target;
        console.log(`<${lastButton.innerHTML}>`);
        console.log(lastButton.classList[1]);
    })
}