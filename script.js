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
const functionButtons = document.querySelectorAll('.function-button');
// The line below only works for a single button but can't assign an event listener to each button on its own!
// numberButtons.addEventListener("click",  displayNumber);
const plusMinusButton = document.getElementById('plus-minus');
plusMinusButton.addEventListener('click', plusMinus); 
const percentageButton = document.getElementById('percentage');
percentageButton.addEventListener('click', asPercentage); 
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearDisplay); 

// iterate through all number buttons to add event listener to each number button
for (let i = 0 ; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', displayNumber); 
 }

 // iterate through all function buttons to add event listener to each function button
for (let i = 0 ; i < functionButtons.length; i++) {
    functionButtons[i].addEventListener('click', mathFunctionSelect); 
 }

function clearDisplay() {
    //clears the place where the expression is stored
    runningList = [];
    //clears the display value that is tied to the expression
    displayValue = 0;
    //clear num 1 num 2 and operator
    num1 = false;
    num2 = false;
    operator = false;
    updateDisplay();
    console.log("Display cleared!");
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
    // NOTE: this value is 9 instead of 10 because the pushing of an array element happens AFTER this check (adds one more element) and spans over different conditionals.
    // https://www.w3schools.com/jsref/jsref_indexof.asp
    // ^^^^ The runningList.indexOf("e") !== -1 checks if any match is present by using indexOf("e"). -1 is returned if check is false. Therefore, !== -1 means a match to "e" was found.
    if (runningList.length > 9 || runningList.indexOf("e") !== -1) {
        console.log("ERROR: no room to add more numbers, or 'E notation' expression is present.");
        return;
       }

       let sumofDigits = runningList.map(function(str) {
        // using map() to convert array of strings to numbers: https://bit.ly/3wDnX5U
        return parseInt(str); });
        // if everything in the array adds up to 0 and the current input is 0, get out of the function!
       if ((sumofDigits.reduce((a, b) => a + b, 0) === 0) && (numberButtonInput === '0')) {
        console.log('leading zero removed');
        return;
       }

    // if the array of all the values starts with a decimal and ONLY contains just that first decimal, update the DOM display w/o number conversion, then break out of the function
    if ((numberButtonInput !== '.') && (runningList.length === 1)) {
        // if the first thing typed in is NOT a decimal, and the current display has 0, and 0 is the first and... 
        // only element in the array, remove the zero and replace it with the first number input that gets typed in.
        runningList.push(numberButtonInput);
        displayValue = (runningList.join(''));
        updateDisplay();
        return;
    }
    // if the clear all button is run, the length of the array is empty. If a decimal place is the input and the array is completely empty, push a leading 0 then the '.' dot.
    else if ((numberButtonInput === '.') && (runningList.length === 0)) {
        runningList.push('0');
        runningList.push(numberButtonInput);
        displayValue = (runningList.join(''));
        updateDisplay();
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
    updateDisplay();    
    }


    // verify the display value is a number every time the value is updated by running this display number function:
    // console.log(typeof displayValue);
}
// ------------------------------------------------- THESE FOUR FUNCTIONS WILL BE MODIFIED SOON -------------------------------------------------
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
    console.log(`${runningList}`);

 if ((runningList.length <= 9)) {
        // if array is less than or equal to 9 in length add or remove the -.
        displayValue = (displayValue * -1);
        //update display value and then the running list with the newly calculated value!
        runningList = String(displayValue).split("").map((displayValue)=>{
            return (displayValue);
            }) 
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
    displayValue = parseFloat(displayValue / 100);
    //update display value and then the running list with the newly calculated value
    runningList = String(displayValue).split("").map((displayValue)=>{
        return (displayValue);
        }) 
// After updating with a value of 0 if % function is run on an array with nothing in it and just ['0'] is returned...
// Into the array from the split("").map above, and if that resulting ['0'] is the only thing sitting in the array, 
// Remove it from the array (.shift();) which leaves the array clear for any following number input. 
// If this conditional is removed, the floating 0 in front is retained from the array and shown in display. BAD! (Again it only runs when runninglist is: ['0'] after % is run.)
        if (runningList[0] === '0' && runningList.length === 1) {
            runningList.shift();
        }
   
        if (runningList.length > 9) {
            console.log(`ERROR: length is too long (${runningList.length}) digits.`);
            //fixed a bug where i ran the DV / 100 calculation twice here
            displayValue = displayValue.toFixed(4);
            // SOURCE: https://www.geeksforgeeks.org/how-to-convert-a-number-into-array-in-javascript/ 
            runningList = String(displayValue).split("").map((displayValue)=>{
                return (displayValue);
                })        
        }
        updateDisplay();
    }

    function operate(num1, operator, num2) {
        // if number 2 is not given, either one of two functions is run: (+/- or %). (NOTE: the visual equal sign will soon be hooked up to CALL THE OPERATE FUNCTION after two numbers are input)
        // if (!(num2)) {
        //     if (operator === '+/-') {
        //         return plusMinus(num1);
        //         console.log('plusminus');
        //     }
        //     else if (operator === '%') {
        //         return asPercentage(num1);
        //         console.log('% that');
        //     }
        // }
        if (operator === 'add') {
           displayValue = addNumbers(num1, num2);
        }
        else if (operator === 'subtract') {
            displayValue = subtractNumbers(num1, num2);
        }
        else if (operator === 'multiply') {
            displayValue = multiplyNumbers(num1, num2);
        }
        else if (operator === 'divide') {
            displayValue = divideNumbers(num1, num2);
        }
        else {console.log('something is wrong')}
    }
    

// runs whenever a function button is pressed.
function mathFunctionSelect() {
    // Grab the id of what button gets clicked! COOL!
    let operatorTemp = this.id;
    let operatorSymbol = this.textContent;

    if (num1 && !num2) {
        runningList = [];
        num2 = displayValue;
        console.log(`num 2 is ${num2}`);
        console.log(`expression is ${num1} ${operatorSymbol} ${num2}`);
    }
// if number 2 DNE at all, store current operator and store display value
    else if (!num2) {
        operator = operatorTemp;
        console.log(`${operator} is selected.`);

            //grab display value store it as num1
    num1 = displayValue;
    console.log(`num2 DNE but num1 is ${num1}`);
    console.log(`${num1} ${operator} number 2`);
        //then clear the runninglist
    runningList = [];
        if (operatorTemp !== 'equals'){    
        displayPara.innerHTML = `${num1} ${operatorSymbol}`;
    }
}
// add and if current operator is NOT = sign then do the following below. if == sign, then all num 1 num 2 and operator must be cleared at some point
if (num1 && num2) {
    operate(num1, operator, num2);
    console.log(`${num1} ${operatorSymbol} ${num2}`);
    num1 = displayValue;
    //grab current operator to evaluate the next expression
    operator = operatorTemp;
    num2 = false;
    updateDisplay();
    if (operatorTemp !== 'equals'){    
        displayPara.innerHTML = `${num1} ${operatorSymbol}`;
    }
    console.log(`${num1} ${operatorSymbol} ${num2}`);
    console.log(runningList);
}

    

}


// test the six basic operator functions (no longer work because a aspercentage and plusminus functions depend on the running list (related to currentdisplay) rather than user input)
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