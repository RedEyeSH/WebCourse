"use strict";

let first_point_x = prompt("Enter the x-coordinate of the first point (x1):");
while (first_point_x.trim() === "" || isNaN(first_point_x)) {
    alert("Invalid input. Please enter a valid number!");
    first_point_x = prompt("Enter the x-coordinate of the first point (x1):");
}

let first_point_y = prompt("Enter the y-coordinate of the first point (y1):");
while (first_point_y.trim() === "" || isNaN(first_point_y)) {
    alert("Invalid input. Please enter a valid number!");
    first_point_y = prompt("Enter the y-coordinate of the first point (y1):");
}

let second_point_x = prompt("Enter the x-coordinate of the second point (x2):");
while (second_point_x.trim() === "" || isNaN(second_point_x)) {
    alert("Invalid input. Please enter a valid number!");
    second_point_x = prompt("Enter the x-coordinate of the first point (x2):");
}

let second_point_y = prompt("Enter the y-coordinate of the second point (y2):");
while (second_point_y.trim() === "" || isNaN(second_point_y)) {
    alert("Invalid input. Please enter a valid number!");
    second_point_y = prompt("Enter the y-coordinate of the first point (y2):");
}

first_point_x = Number(first_point_x);
first_point_y = Number(first_point_y);
second_point_x = Number(second_point_x);
second_point_y = Number(second_point_y);

let points = [];
points.push(first_point_x, first_point_y, second_point_x, second_point_y);

const distance = Math.sqrt((second_point_x - first_point_x)**2 + (second_point_y - first_point_y)**2);
const target = document.querySelector("#target");
for (let i = 0; i < points.length; i++) {
    const p = document.createElement("p");

    if (i === 0) {
        p.innerHTML = "The x-coordinate of the first point is: " + points[i];
    } else if (i === 1) {
        p.innerHTML = "The y-coordinate of the first point is: " + points[i];
    } else if (i === 2) {
        p.innerHTML = "The x-coordinate of the second point is: " + points[i];
    } else if (i === 3) {
        p.innerHTML = "The y-coordinate of the second point is: " + points[i];
    }
    target.append(p);
}

const result = document.createElement("p");
result.innerHTML =  "The distance between the two points is: " + distance.toFixed(1);
target.append(result);
