"use strict";
const numbers = [5, 2, 8, 1, 9];

function sortArray(numbers, order) {
    if (order == "asc") {
        return numbers.sort((a, b) => a - b);
    } else if (order == "desc") {
        return numbers.sort((a, b) => b - a);
    }
}

console.log(sortArray(numbers, "asc"));
console.log(sortArray(numbers, "desc"));
