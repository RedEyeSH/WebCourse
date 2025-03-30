"use strict";

async function fetchData() {
    const user = {
        name: "Seth Clay",
        job: 'Software engineer'
    };
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    
    try {
        const response = await fetch("https://reqres.in/api/users", options);
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