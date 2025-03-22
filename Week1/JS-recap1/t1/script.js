"use strict";

const celsius = Number(prompt("Enter celsius: "));
const p_celsius = document.createElement("p");
p_celsius.innerHTML = "Given temperature in Celsius: " + celsius;

const fahrenheit = (celsius * 9/5) + 32;
const p_fahrenheit = document.createElement("p");
p_fahrenheit.innerHTML = "Fahrenheit: " + fahrenheit;

const kelvin = celsius + 273.15;
const p_kelvin = document.createElement("p");
p_kelvin.innerHTML = "Kelvin: " + kelvin;

const target = document.querySelector("#target");
target.append(p_celsius, p_fahrenheit, p_kelvin);
