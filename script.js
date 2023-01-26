// welcome to the js file

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

// test the four basic operators
// returns 4
console.log(addNumbers(2,2));
// returns 0
console.log(subtractNumbers(2,2));
// returns 4
console.log(multiplyNumbers(2,2));
// returns 1
console.log(divideNumbers(2,0));