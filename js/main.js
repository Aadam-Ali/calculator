/* 
* Calculator application
*
* Written by Aadam Ali on 11.01.2021
*/

let firstOperand = null
let secondOperand = null
let firstOperator = null
let result = null

const display = $('#display')

$(".operand").click(function () { inputOperand($(this).text()) });
$(".decimal").click(function () { inputDecimal() });
$(".operator").click(function () { inputOperator($(this).text()) });
$(".equals").click(function () {
    if (secondOperand == null) {
        if ($("#display").text().length > 0) { secondOperand = $("#display").text() }
        else { secondOperand = '0' };
        inputEquals(firstOperand, secondOperand, firstOperator);
    }
})
$(".percent").click(function () { inputPercent($(this).text()) });
$(".sign").click(function () { changeSign() });
$(".clear").click(function () { inputClear() });

// adds event listeners for the keyboard
$(window).keydown(keyboardAction)
function keyboardAction(e) {
    if (e.key >= 0 && e.key <= 9) { inputOperand(e.key) }
    else if (e.key == '.') { inputDecimal() }
    else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') { inputOperator(e.key) }
    else if (e.key == '=' || e.key == 'Enter') {
        if (secondOperand == null) {
            if ($("#display").text().length > 0) { secondOperand = $("#display").text() }
            else { secondOperand = '0' }
        }
        inputEquals(firstOperand, secondOperand, firstOperator)
    }
    else if (e.key == '%') { inputPercent($("#display").text()) }
    else if (e.key == 'Delete') { inputClear() }
    else if (e.key == 'Backspace') { backspace() }
}

function inputOperand(operand) {
    if ($("#display").text().length < 12) {
        $("#display").text($("#display").text() + operand)
    }
}

function backspace() {
    let displayArray = $("#display").text().split('')
    displayArray.pop()
    result = displayArray.join('')
    if (result.length == 0) {
        inputClear()
    } else {
        $("#display").text($("#display").text() + result)
    }
}

// adds decimal with check to ensure that more than one decimal cannot be inputted
function inputDecimal() {
    if ($("#display").text().match(/\./)) {
        return false
    } else {
        $("#display").text($("#display").text() + ".")
    }
}

function inputPercent(num) {
    if ($("#display").text() == '') { return }
    a = parseFloat(num) * 100
    updateDisplay(a)
}

function inputOperator(operator) {
    if (firstOperand == null && secondOperand == null) {
        if ($("#display").text() == '') { return }
        else if ($("#display").text() == '-') {
            firstOperand = '-1'
            firstOperator = operator
            $("#display").text("")
        } else {
            firstOperand = $("#display").text()
            firstOperator = operator
            $("#display").text("")
        }
    } else if (firstOperand != null && secondOperand == null) {
        firstOperator = operator
        $("#display").text("")
    }
}

// add negative/positive functionality
function changeSign() {
    if ($("#display").text().length == 0) {
        $("#display").text("-")
    } else {
        let displayArray = $("#display").text().split('')
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
        $("#display").text("Error")
        return null
    }
    return parseFloat(a) / parseFloat(b);
};

function inputEquals(a, b, operator) {
    secondOperand == $("#display").text()
    if (operator == '+') {
        result = add(a, b);
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
}

// updates display, using scientific notation for extremely large and extremely small numbers
function updateDisplay(num) {
    firstOperand = result
    secondOperand = null
    if (num.toString().length < 12) {
        $("#display").text(num)
    } else {
        $("#display").text(Number.parseFloat(num).toPrecision(7))
    }
}

function inputClear() {
    firstOperand = null
    secondOperand = null
    firstOperator = null
    result = null
    $("#display").text("")
}