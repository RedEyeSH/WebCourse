"use strict";

let number = prompt("Enter a positive integer:");

while (number.trim() === "" || isNaN(number) || !(number > 0)) {
    alert("Please enter a valid positive number!");
    number = prompt("Enter a positive integer:");
}

number = Number(number);

const target = document.querySelector("#target");
const table = document.createElement("table");
for (let i = 1; i <= number; i++) {
    const tr = document.createElement("tr");
    for (let j = 1; j <= number; j++) {
        const td = document.createElement("td");
        td.innerHTML = i * j;
        tr.append(td);
    }
    table.append(tr);
}
table.style.textAlign = "right";
target.append(table);
