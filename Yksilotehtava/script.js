"use strict";


// Login setup starts here
const login_button = document.getElementById("navbar-login");

login_button.addEventListener('click', () => {
    document.getElementById("account").classList.toggle("open-login");
    document.getElementById("box-overlay").classList.toggle("show-box-overlay");
});

// Login setup ends here

// testing
// const 