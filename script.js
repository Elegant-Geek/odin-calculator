// welcome to the js file
let num1;
let num2;

function addNumbers(num1, num2) {
    return (num1 + num2);
}
function subtractNumbers(num1, num2) {
    return (num1 - num2);

}
function multiplyNumbers(num1, num2) {
    return (num1 * num2);

}
function divideNumbers(num1, num2) {
    if (num2 === 0) {
        console.log('Cannot divide by 0.')
        return num1;
    }
    return (num1 / num2);
}

function plusMinus(num1) {
    return (num1 * -1);
}

function asPercentage(num1) {
    return (num1 / 100);
}

function operate(num1, operator, num2) {
    // if number 2 is not given, either one of two functions is run: (+/- or %). (NOTE: the visual equal sign will soon be hooked up to CALL THE OPERATE FUNCTION after two numbers are input)
    if (!(num2)) {
        if (operator === '+/-') {
            return plusMinus(num1);
            console.log('plusminus');
        }
        else if (operator === '%') {
            return asPercentage(num1);
            console.log('% that');
        }
    }
    if (operator === '+') {
       return addNumbers(num1, num2);
    }
    else if (operator === '-') {
        return subtractNumbers(num1, num2);
    }
    else if (operator === '*') {
        return multiplyNumbers(num1, num2);
    }
    else if (operator === '/') {
        return divideNumbers(num1, num2);
    }
    else {console.log('something is wrong')}
}

// test the six basic operator functions
// addNumbers returns 4
console.log(addNumbers(2,2));
// subtractNumbers returns 0
console.log(subtractNumbers(2,2));
// multiplyNumbers returns 4
console.log(multiplyNumbers(2,2));
// divideNumbers returns 1
console.log(divideNumbers(2,0));
// plusMinus returns -2
console.log(plusMinus(2));
// asPercentage returns 0.02
console.log(asPercentage(2));

//testing the operate function (6 tests)
console.log('TESTING THE OPERATE FUNCTION (6 mini-functions inside)')
// returns 4
console.log(operate(2, '+', 2));
// returns 0
console.log(operate(2, '-', 2));
// returns 4
console.log(operate(2, '*', 2));
// returns 1
console.log(operate(2, '/', 2));
// returns -2
console.log(operate(2, '+/-'));
// returns 0.02
console.log(operate(2, '%'));