"use strict";

let number = prompt("Enter a positive number greater than 0:");

while (number.trim() === "" || isNaN(number) || !number > 0) {
    alert("Please enter a valid positive number greater than 0!");
    number = prompt("Enter a positive number greater than 0:");
}

let total = 0;
for (let i = 1; i <= number; i++) {
    total += i;
}

const target = document.querySelector("#target");
target.innerHTML = `The sum of natural numbers from 1 to ${number} is: ${total}`;
