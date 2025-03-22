"use strict";

let first_side = prompt("Enter the length of the first side of the triangle:");
while (first_side.trim() === "" || isNaN(first_side)) {
    alert("Invalid input. Please enter a valid number!");
    first_side = prompt("Enter the length of the first side of the triangle:");
}

let second_side = prompt("Enter the length of the second side of the triangle:");
while (second_side.trim() === "" || isNaN(second_side)) {
    alert("Invalid input. Please enter a valid number!");
    second_side = prompt("Enter the length of the second side of the triangle:");
}

let third_side = prompt("Enter the length of the third side of the triangle:");
while (third_side.trim() === "" || isNaN(third_side)) {
    alert("Invalid input. Please enter a valid number!");
    third_side = prompt("Enter the length of the third side of the triangle:");
}

first_side = Number(first_side);
second_side = Number(second_side);
third_side = Number(third_side);

let triangle_sides = [];
triangle_sides.push(first_side, second_side, third_side);

const target = document.querySelector("#target");
for (let i = 0; i < triangle_sides.length; i++) {
    const p = document.createElement("p");
    if (i === 0) {
        p.innerHTML = "The length of the first side is: " + triangle_sides[i];
    } else if (i === 1) {
        p.innerHTML = "The length of the second side is: " + triangle_sides[i];
    } else if (i === 2) {
        p.innerHTML = "The length of the third side is: " + triangle_sides[i];
    }
    target.append(p);
}

const result = document.createElement("p");
if (first_side == second_side && second_side == third_side) {
    result.innerHTML = "equilateral";
} else if (first_side == second_side || second_side == third_side || first_side == third_side) {
    result.innerHTML = "isosceles";
} else if (first_side != second_side && second_side != third_side && first_side != third_side) {
    result.innerHTML = "scalene";
}

target.append(result);
