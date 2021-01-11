/* 
* Calculator application
*
* Written by Aadam Ali on 11.01.2021
*/

let firstOperand = null
let secondOperand = null
let firstOperator = null
let result = null

const buttons = document.querySelectorAll('button')
const display = document.querySelector('#display')

// adds event listeners for the buttons based of class names
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        if (buttons[i].classList.contains('operand')) {
            inputOperand(buttons[i].textContent)
        } else if (buttons[i].classList.contains('decimal')) {
            inputDecimal()
        } else if (buttons[i].classList.contains('operator')) {
            inputOperator(buttons[i].textContent) 
        } else if (buttons[i].classList.contains('equals')) {
            if (secondOperand == null) {
                if (display.textContent.length > 0) {secondOperand = display.textContent}
                else {secondOperand = '0'}
            }
            inputEquals(firstOperand, secondOperand, firstOperator)
        } else if (buttons[i].classList.contains('percent')) {
            inputPercent(display.textContent)
        } else if (buttons[i].classList.contains('sign')) {
            changeSign()
        } else if (buttons[i].classList.contains('clear')) {
            inputClear()
        }
    }) 
}

// adds event listeners for the keyboard
window.addEventListener("keydown", keyboardAction)
function keyboardAction(e) {
    console.log(e.key)
    if (e.key >= 0 && e.key <= 9) {inputOperand(e.key)} 
    else if (e.key == '.') {inputDecimal()}
    else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {inputOperator(e.key)} 
    else if (e.key == '=' || e.key == 'Enter') {if (secondOperand == null) {
        if (display.textContent.length > 0) {secondOperand = display.textContent}
        else {secondOperand = '0'}} 
    inputEquals(firstOperand, secondOperand, firstOperator)}
    else if (e.key == '%') {inputPercent(display.textContent)}
    else if (e.key == 'Delete') {inputClear()}
    else if (e.key == 'Backspace') {backspace()}
}

function inputOperand(operand) {
    if (display.textContent.length < 12) {
        display.textContent += operand
    }
}

function backspace() {
    let displayArray = display.textContent.split('')
    displayArray.pop()
    result = displayArray.join('')
    if (result.length == 0) {
        inputClear()
    } else {
        display.textContent = result
    }
}

// adds decimal with check to ensure that more than one decimal cannot be inputted
function inputDecimal() {
    if (display.textContent.match(/\./)) {
        return false
    } else {
        display.textContent += '.'
    }
}

function inputPercent(num) {
    if (display.textContent == '') {
        return
    }
    a = parseFloat(num) * 100
    updateDisplay(a)
}

function inputOperator(operator) {
    if (firstOperand == null && secondOperand == null) {
        if (display.textContent == '') {
            return
        } else if (display.textContent == '-') {
            firstOperand = '-1'
            firstOperator = operator
            display.textContent = ''
        } else {
            firstOperand = display.textContent
            firstOperator = operator
            display.textContent = ''
        }
    } else if (firstOperand != null && secondOperand == null) {
        firstOperator = operator
        display.textContent = ''
    }
}

// add negative/positive functionality
function changeSign() {
    if (display.textContent.length == 0) {
        display.textContent = '-'
    } else {
        let displayArray = display.textContent.split('')
        // negative to positve
        if (displayArray[0] == '-') {
            displayArray.shift()
            result = displayArray.join('')
            updateDisplay(result)
        } else { 
            // positive to negative
            displayArray.unshift('-')
            result = displayArray.join('')
            updateDisplay(result)
        }
    }
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
};

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
};

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
};

function divide(a, b) {
    if (b == '0') {
        display.textContent = 'Error'
        return null
    }
    return parseFloat(a) / parseFloat(b);
};

function inputEquals(a, b, operator) {
    secondOperand == display.textContent
    if (operator == '+') {
        result =  add(a, b);
        updateDisplay(result)
    } else if (operator == '-') {
        result = subtract(a, b);
        updateDisplay(result)
    } else if (operator == '*') {
        result = multiply(a, b)
        updateDisplay(result)
    } else if (operator == '÷' || operator == '/') {
        result = divide(a, b)
        updateDisplay(result)
    } else {
        result = secondOperand
        updateDisplay(result)
    }
    console.log('Equals Inputted')
}

// updates display, using scientific notation for extremely large and extremely small numbers
function updateDisplay(num) {
    firstOperand = result
    secondOperand = null
    if (num.toString().length < 12) {
        display.textContent = num
    } else {
        display.textContent = Number.parseFloat(num).toPrecision(7)
    }
}

function inputClear() {
    firstOperand = null
    secondOperand = null
    firstOperator = null
    result = null
    display.textContent = ''
}

