"use strict";

let numbers = [];
let number;

while (number !== "done") {
    number = prompt("Enter a number (or 'done' to finish): ");
    if (Number(number)) numbers.push(number);  
}

const target = document.querySelector("#target");
const even_numbers = [];

for (let x of numbers) {
    if (x % 2 == 0) {
        even_numbers.push(x);
    }
}

if (even_numbers.length > 0) {
    target.innerHTML = "Even Numbers: " + even_numbers.join(", ");
} else {
    target.innerHTML = "Even Numbers: None";
}

