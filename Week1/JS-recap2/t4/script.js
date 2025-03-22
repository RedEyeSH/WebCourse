"use strict";
const numbers = [5, 30, 10, 100, 20];

function sortArray(numbers) {
    return numbers.sort((a, b) => a - b);
}

console.log(sortArray(numbers));
