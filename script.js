// welcome to the js file
let num1;
let num2;
let operator;
let runningList = [];
let displayValue = 0;

const displayParent = document.querySelector('.calculator-display');
// create new dom element p tag thing that gets created by default set to zero
const displayPara = document.createElement('p');
displayPara.innerHTML = `${displayValue}`;
displayParent.appendChild(displayPara);
// grab all number buttons
const numberButtons = document.querySelectorAll('.number-button');
// The line below only works for a single button but can't assign an event listener to each button on its own!
// numberButtons.addEventListener("click",  displayNumber);
const plusMinusButton = document.getElementById('plusminus');
plusMinusButton.addEventListener('click', plusMinus); 
const percentageButton = document.getElementById('percentage');
percentageButton.addEventListener('click', asPercentage); 


// iterate through all number buttons to add event listener to each number button
for (let i = 0 ; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', displayNumber); 
 }

function updateDisplay() {
    console.log(runningList);
    console.log(displayValue);
    displayPara.textContent = `${displayValue}`;
    // update display value with a numerical conversion type AFTER the display is updated so that decimal points are rendered. 
    // If the display was updated with the Number() acting on the displayvalue before printing, the decimal gets ignored by the Number() function (view becomes inaccurate.)
    // "78." becomes 78 when converted to number format below.
    displayValue = Number(displayValue);

}
function displayNumber() {
    // display the text content of each numberButtons[i]
    // console.log(`${this.textContent}`);
    // assign the current place in the array
    let numberButtonInput = this.textContent;
    // stop the array from accumulating more than 10 digits upon any further button press!
    // NOTE: this check is done first because the other checks below activate pushes which adds one more valid value to the array.
    // NOTE: this value is 9 instead of 10 because the pushing of an array element happens AFTER this check and spans over different conditionals. Less complex to put this single check up here.
    if (runningList.length > 9) {
        console.log("ERROR: no room to add more numbers.");
        return;
       }
    // if the array of all the values starts with a decimal and ONLY contains just that first decimal, update the DOM display w/o number conversion, then break out of the function
    if (runningList[0] === '.' && runningList.length === 1) {
        runningList.push(numberButtonInput);
        displayValue = (runningList.join(''));
        // note the lack of number conversion when decimal point is entered for the first array entry
        displayPara.textContent = `${displayValue}`; 
        return;
    }
    // if any instance more than one decimal exists, get out of the function.
    // if there is a single instance of the decimal in the array already and the current input for onclick that triggers displayButton is '.' then DO NOT add it! Escape the function.
    if ((runningList.filter(x => x === '.').length === 1 && this.textContent === '.')) {
        console.log('CANNOT ADD MORE THAN ONE DECIMAL POINT TO NUMBER');
        return;
    }
    else {
    runningList.push(numberButtonInput);
    displayValue = (runningList.join(''));
    console.log(runningList);

    updateDisplay();    
    }


    // verify the display value is a number every time the value is updated by running this display number function:
    // console.log(typeof displayValue);
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

function plusMinus() {
    if (runningList[0] === '-') {
        //if there is a '-' in front, remove it (this acts like a button toggle)
        runningList.shift();
    }
    else if ((runningList.length <= 9) && (runningList[0] !== '-')) {
        // if array is less than or equal to 9 in length and there is not a '-' in front already, add one.
        runningList.unshift('-');
    }
// this gets displayed if the function is called but there is not enough space for the - sign. 
    else {
        console.log("ERROR: no room to add a -");
        console.log(`${runningList.length} characters are already displayed`);
    }

    displayValue = (runningList.join(''));
    // displayValue = (displayValue * -1);
    updateDisplay();


}

function asPercentage() {
    // you cannot use the percentage button if array is 9+ characters including decimal or if array is 9+ characters including an existing '-' sign and decimals. 
    if (runningList.length > 10) {
        return;
       }
    //update displayvalue and then the running list with the newly calculated value
    displayValue = parseFloat(displayValue / 100);
    runningList = String(displayValue).split("").map((displayValue)=>{
        return (displayValue);
        }) 
   
        if (runningList.length > 9) {
            console.log(`ERROR: length is too long (${runningList.length}) digits.`);
            displayValue = parseFloat(displayValue / 100).toFixed(4);
            // SOURCE: https://www.geeksforgeeks.org/how-to-convert-a-number-into-array-in-javascript/ 
            runningList = String(displayValue).split("").map((displayValue)=>{
                return (displayValue);
                })        
        }
        updateDisplay();
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
// console.log(addNumbers(2,2));
// // subtractNumbers returns 0
// console.log(subtractNumbers(2,2));
// // multiplyNumbers returns 4
// console.log(multiplyNumbers(2,2));
// // divideNumbers returns 1
// console.log(divideNumbers(2,0));
// // plusMinus returns -2
// console.log(plusMinus(2));
// // asPercentage returns 0.02
// console.log(asPercentage(2));

// //testing the operate function (6 tests)
// console.log('TESTING THE OPERATE FUNCTION (6 mini-functions inside)')
// // returns 4
// console.log(operate(2, '+', 2));
// // returns 0
// console.log(operate(2, '-', 2));
// // returns 4
// console.log(operate(2, '*', 2));
// // returns 1
// console.log(operate(2, '/', 2));
// // returns -2
// console.log(operate(2, '+/-'));
// // returns 0.02
// console.log(operate(2, '%'));