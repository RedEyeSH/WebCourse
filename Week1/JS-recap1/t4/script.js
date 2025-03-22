"use strict";

let score = prompt("Enter a grading score between 0 and 100:");
while (score.trim() === "" || isNaN(score) || !(score >= 0 && score <= 100)) {
    alert(`You entered: ${score}. Please enter a valid number between 0 and 100.`);
    score = prompt("Enter a grading score between 0 and 100:");
}

let grade;
if (score >= 0 && score <= 39) {
    grade = 0;
} else if (score >= 40 && score <= 51) {
    grade = 1;
} else if (score >= 52 && score <= 63) {
    grade = 2;
} else if (score >= 64 && score <= 75) {
    grade = 3;
} else if (score >= 76 && score <= 87) {
    grade = 4;
} else if (score >= 88 && score <= 100) {
    grade = 5;
}

const target = document.querySelector("#target");
const p = document.createElement("p");

p.innerHTML = `Your score is ${score}, and your grade is: ${grade}`;
target.append(p);
