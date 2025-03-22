'use strict';

let numbers = [];

for (let i = 0; i < 5; i++) {
    let number = prompt(`Enter Number ${i + 1}: `);
    numbers.push(number);
}

console.log("Numbers:", numbers);

let search = prompt("Enter a Number to Search: ");
if (numbers.includes(search)) {
    console.log(`Number ${search} is found in the array.`);
} else {
    console.log(`Number ${search} is not found in the array.`);
}

numbers.pop();

console.log("Updated Numbers:", numbers);

numbers.sort((a, b) => a - b);

console.log("Sorted Numbers:", numbers);