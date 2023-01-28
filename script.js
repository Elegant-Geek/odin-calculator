// welcome to the js file
let num1;
let num2;
let operator;

const displayParent = document.querySelector('.calculator-display');
// create new dom element p tag thing that gets created by default set to zero
const displayPara = document.createElement('p');
// displayPara.innerHTML = "TESTTT";
displayParent.appendChild(displayPara);
// grab all number buttons
const numberButtons = document.querySelectorAll('.number-button');
// The line below only works for a single button but can't assign an event listener to each button on its own!
// numberButtons.addEventListener("click",  displayNumber);



// iterate through all number buttons to add event listener to each number button
for (let i = 0 ; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click' , displayNumber); 
    let temp = numberButtons[i].textContent;
    console.log(temp);
 }

function displayNumber() {
    // display the text content of each numberButtons[i]
    // console.log(`${this.textContent}`);
    displayPara.textContent = `${this.textContent}`;
}

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

function display() {
    // if number is pressed display it if it is not a number (like an operator, dont update display)
    
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