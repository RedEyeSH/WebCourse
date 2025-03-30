"use strict";

async function fetchData() {
    try {
        const response = await fetch("https://reqres.in/api/users/1");  
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(jsonData);
    } catch (error) {
        console.error("Error:", error);
    }
}   

fetchData();