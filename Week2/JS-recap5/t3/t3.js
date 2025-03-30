"use strict";

async function fetchData(url, method = "GET", body = null) {
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };
  
      if (body) {
        options.body = JSON.stringify(body);
      }
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(`${method} Request Successful:`, data);
    } catch (error) {
      console.error(`${method} Request Failed:`, error.message);
    }
  }
  
  fetchData("https://reqres.in/api/unknown/23");
  
  fetchData("https://reqres.in/api/users", "POST", { name: "John Doe", job: "Developer" });
  
  fetchData("https://reqres.in/api/users/2", "PUT", { name: "Jane Doe", job: "Manager" });
  
  fetchData("https://reqres.in/api/users/2", "DELETE");
  