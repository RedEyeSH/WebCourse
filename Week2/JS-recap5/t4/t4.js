"use strict";

async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`${response.statusText} ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
}

async function init() {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

init();
