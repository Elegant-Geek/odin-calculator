// define numerical input num1 num2 and operator
let num1;
let num2;
let operator;
// empty the array on first load and the display value onscreen is 0
let runningList = [];
let displayValue = 0;
// grab the main display box that holds the calculator to use as a reference div
const displayParent = document.querySelector('.calculator-display');
// create new dom paragraph element, set the text content, then append to parent container
const displayPara = document.createElement('p');
displayPara.textContent = `${displayValue}`;
displayParent.appendChild(displayPara);
// grab all of the number buttons and function buttons, assign as DOM constants
const numberButtons = document.querySelectorAll('.number-button');
const functionButtons = document.querySelectorAll('.function-button');
// assign specific constants to specific DOM elements by ID (These are the three function buttons. Each button has its own function associated with it on the next line)
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
    // clears the place where the expression is stored
    runningList = [];
    // clears the display value back to 0
    displayValue = 0;
    //reset num 1 num 2 and operator variables completely
    num1 = false;
    num2 = false;
    operator = false;
    //update display and ensure the running list is associated / updated to match this display value.
    updateDisplay();
    console.log("Display cleared!");
}
function updateDisplay() {
    // fixes value overflow on display update when dividing 5 / 3 for instance
    // CHANGED THIS CONDITION TO ONLY RELY ON CURRENT DISPLAY VALUE, NOT RUNNINGLIST ARRAY. When doing 5/3, blank array is returned.
    // if array is too long, convert to string and keep only the first 9 characters for the ANY updated display. A warning in the console exists too.
    if (displayValue.toString().length > 9) {
        console.log(`ERROR: length is too long (${runningList.length}) digits. (NOTE: large numbers over 9 digits- or 8 with a decimal will not be displayed properly.)`);
        // take current display value and only keep the FIRST 9 DIGITS.
        displayValue = String(displayValue).substring(0,9);
        // SOURCE: https://www.geeksforgeeks.org/how-to-convert-a-number-into-array-in-javascript/ 
        // updates running list to keep the first 9 characters onscreen
        runningList = String(displayValue).split("").map((displayValue)=>{
            return (displayValue);
            })        
    }
    console.log(runningList);
    console.log(displayValue);
    displayPara.textContent = `${displayValue}`;
    // MUST update display value with a numerical conversion type (line 65) AFTER the display is updated so that decimal points are rendered. 
    // If the display was updated with the Number() acting on the displayvalue before printing, the decimal gets ignored by the Number() function (view becomes inaccurate.)
    // "78." becomes 78 when converted to number format below.
    displayValue = Number(displayValue);
}
function displayNumber() {
    // display the text content of each numberButtons[i]
    // console.log(`${this.textContent}`);
    // grab the current location of the exact number button in the array (function passes in numberButtons[i]) and grab the text content from this point in the array using "this".
    let numberButtonInput = this.textContent;
    // https://www.w3schools.com/jsref/jsref_indexof.asp
    // ^^^^ The runningList.indexOf("e") !== -1 checks if any match is present by using indexOf("e"). -1 is returned if check is false. Therefore, !== -1 means a match to "e" was found.
    if (runningList.indexOf("e") !== -1) {
        console.log("ERROR: 'E notation' expression is present. Select an operator button.");
        return;
    }
    // using map() to convert array of strings to numbers: https://bit.ly/3wDnX5U
    let sumofDigits = runningList.map(function(str) {
    return parseInt(str); });
    // if everything in the array adds up to 0 and the current input is 0, get out of the function! (The last part of the and statement means you will stay in the function if a single 0 is the only thing in the array.)
    if ((sumofDigits.reduce((a, b) => a + b, 0) === 0) && (numberButtonInput === '0') && runningList.length > 0) {
    console.log('leading zero removed (This prevents you from typing in 00000).');
    return;
    }
// if list starts with a negative and then followed by a zero but does NOT contain a decimal, then you can remove the leading 0 (I don't want the leading 0 removed for decimal input)
// this removes the floating 0 in -08 for instance
    if ((runningList[0] === '-') && (runningList[1] === '0') && (runningList.filter(x => x === '.').length === 0 )) {
    runningList.pop();
    // ['-','0'] becomes [-] before you push the next digit in further along in this function. 
    console.log('for the negative toggle mode, removed floating zero that appears after the +/- toggle (GOOD)');
    }
    // else if the runninglist only has 0 in it and no decimal, then you can remove that zero in the FRONT
    // this removes the floating 0 in positive 08 for instance
    else if ((runningList[0] === '0') && (runningList.filter(x => x === '.').length === 0 )) {
    runningList.shift();
    // ['0'] becomes [] before you push the next digit in further along in this function. 
    console.log('for the positive toggle mode, removed floating zero that appears after the +/- toggle (GOOD)');
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
    // if array is empty (ex: after a cleardisplay, and if a decimal place is typed, push a leading 0 first and THEN the '.' dot.
    // user sees 0 onscreen then presses '.' then gets back "0." rather than just "." (BAD)
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
    // for all other instances, push (add) the selected number button input to the end of the runninglist array.
    runningList.push(numberButtonInput);
    displayValue = (runningList.join(''));
    updateDisplay();    
    }
    // verify the display value is a number every time the value is updated by running this display number function:
    // console.log(typeof displayValue);
}
// ------------------------------------------------- THE FOUR FUNCTIONS -------------------------------------------------
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
    //division by 0 just returns the first numerical input (num1) If you divide 8 by 8, you get 8 back.
    if (num2 === 0) {
        console.log('Cannot divide by 0.')
        return (num1);
    }
    else {    
        return (num1 / num2);
    }
}
function plusMinus() {
    console.log(`${runningList}`);

 if ((runningList.length <= 9)) {

            // After updating with a value of 0 if % function is run on an array with nothing in it and just ['0'] is returned...
// Into the array from the split("").map above, and if that resulting ['0'] is the only thing sitting in the array, 
// Remove it from the array (.shift();) which leaves the array clear for any following number input. 
// If this conditional is removed, the floating 0 in front is retained from the array and shown in display. BAD! (Again it only runs when runninglist is: ['0'] after % is run.)
        if (runningList[0] === '0' && runningList.length === 1) {
            runningList.unshift('-');
            console.log('Negative sign added to 0!');
        }
        // if array is blank upon first load, clear screen etc. like runningList is like this [], then add a 0 and a - to it!]
        else if (runningList.length == 0 ) {
            runningList = ['-', '0'];
            console.log('Negative sign added to blank array!');
        }
        else if ((runningList[0] === '-') && (runningList[1] === '0')) {
            runningList.shift();
            console.log('Negative sign removed!');
            displayValue = 0;
        }
        else {
                    // if array is less than or equal to 9 in length add or remove the -.
        displayValue = (displayValue * -1);
        console.log('Multiplied number * -1!');
        //update display value and then the running list with the newly calculated value!
        runningList = String(displayValue).split("").map((displayValue)=>{
            return (displayValue);
            }) 
        }
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
        if (num1 === 0 || num2 === 0)
        {console.log('AWOOGASUCCESS');}
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
        else {
            console.log('equals sign is being used')
            console.log(`num1 is ${num1} operator is ${operator} num2 is ${num2}`)
    }
    }
    

// runs whenever a function button is pressed.
function mathFunctionSelect() {
    // Grab the id of what button gets clicked! COOL!
    let operatorTemp = this.id;
    let operatorSymbol = this.textContent;
// if just 'if num1' then 0 as an input gets ignored. This was my fix! 
    if ((num1 || num1 === 0) && !num2) {
        runningList = [];
        num2 = displayValue;
        console.log(runningList)
        console.log(`num1 ${num1} num2 ${num2}operatorRR${operator}`);
        console.log(`num 2 is ${num2}`);
        console.log(`expression is ${num1} ${operator} ${num2}`);
    }

// if number 2 DNE at all, store current operator and store display value
    else if (!num2) {
        operator = operatorTemp;
        console.log(`${operator} is selected.`);
        console.log(`num1 ${num1} num2 ${num2}operatorrrr${operator}`);
        //this code below fixes the (89 = + 1 = 891 glitch and returns 90)
        if (operatorTemp === 'equals' && num1 !== 0) {
            console.log('spit out return num1');
            return;
        }

            //grab display value store it as num1
    num1 = displayValue;
    num2 = false;
    // if display value has "false anywhere in it" then num2 = 0 otherwise displayvalue = num2
    displayValue = num2;
    console.log(`num2 DNE but num1 is ${num1}`);
    console.log(`${num1} ${operator} TBD number 2`);
        //then clear the runninglist
    runningList = [];
        if (operatorTemp !== 'equals'){    
        displayPara.textContent = `${num1} ${operatorSymbol}`;
    }

}
console.log(`we are right before evaluation! NUMBER 1 IS ${num1} NUM 2 IS ${num2} `);
if (num1 === 0 || num2 === 0) {
    console.log('matches to 0!');
}
if ((num1 || num1 === 0) && (num2 || num2 === 0) && operator) {

    operate(num1, operator, num2);
    console.log(`the answer to ${num1} ${operator} ${num2} is ${displayValue}.`);
    // always have num1 rounded to 8 chars!!!! Do not remove. Using substring(0,8) not (0,9) here so there is room for + - % etc onscreen without text overspill
    num1 =  String(displayValue).substring(0,8);
    //convert back to number after chopping off the string so that accidental concatenation with the PLUS does not happen when adding a chopped off long decimal number!
    num1 = Number(num1);
    console.log(`${num1} ${operatorSymbol} ${num2}`);
    console.log(typeof num1);
    //grab current operator to evaluate the next expression
    operator = operatorTemp;
    num2 = false;
    updateDisplay();
    if (operatorTemp !== 'equals'){    
        displayPara.textContent = `${num1} ${operatorSymbol}`;
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