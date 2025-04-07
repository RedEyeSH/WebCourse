"use strict";

// Account login/signup setup starts here
const login_button = document.getElementById("navbar-login");
login_button.addEventListener('click', () => {
    document.getElementById("account").classList.toggle("open-account-section");
    document.getElementById("account-container").classList.toggle("account-container-login");
    document.getElementById("box-overlay").classList.toggle("show-box-overlay");
});

const signup_form = document.getElementById("signup");
signup_form.addEventListener('click', () => {
    document.getElementById("login-form").classList.remove("show-login-form");
    // document.getElementById("signup-form").classList.remove("close-signup-form"); 

    document.getElementById("login-form").classList.toggle("close-login-form"); 
    document.getElementById("signup-form").classList.toggle("show-signup-form");

    document.getElementById("account-container").classList.remove("account-container-login");  
    document.getElementById("account-container").classList.toggle("account-container-signup");  
});

const login_form = document.getElementById("login");
login_form.addEventListener('click', () => {
    document.getElementById("login-form").classList.remove("close-login-form"); 
    document.getElementById("signup-form").classList.remove("show-signup-form");

    document.getElementById("login-form").classList.toggle("show-login-form");
    // document.getElementById("signup-form").classList.toggle("close-signup-form"); 
    
    document.getElementById("account-container").classList.remove("account-container-signup");  
    document.getElementById("account-container").classList.toggle("account-container-login");  
});

// Handling the logic for closing the forms
function removeAccountClasses() {
    document.getElementById("account").classList.remove("open-account-section");
    document.getElementById("account").classList.remove("open-account-login");

    document.getElementById("account-container").classList.remove("account-container-login");
    document.getElementById("account-container").classList.remove("account-container-signup");
    
    document.getElementById("box-overlay").classList.remove("show-box-overlay");

    document.getElementById("login-form").classList.remove("close-login-form");
    document.getElementById("login-form").classList.remove("show-login-form");
    document.getElementById("signup-form").classList.remove("show-signup-form");
    document.getElementById("signup-form").classList.remove("close-signup-form");
}

const close_form = document.querySelectorAll("#x-close-form");
close_form.forEach((button) => {
    button.addEventListener('click', removeAccountClasses);
});

const close_form_ = document.getElementById("box-overlay");
close_form_.addEventListener('click', removeAccountClasses);

// Sign up date handle
// const daySelect = document.getElementById("signup-day");
// const monthSelect = document.getElementById("signup-month");
// const yearSelect = document.getElementById("signup-year");

// function updateDays() {
//     const month = parseInt(monthSelect.value);
//     const year = parseInt(yearSelect.value);

//     if (month && year) {
//         const daysInMonth = new Date(year, month, 0).getDate();

//         for (let i = 1; i <= daysInMonth; i++) {
//             const option = document.createElement("option");
//             option.value = i;
//             option.textContent = i;
//             daySelect.appendChild(option);
//         }
//     }
// }

// const currentYear = new Date().getFullYear();
// const minYear = currentYear - 100;
// const maxYear = currentYear;

// for (let year = maxYear; year >= minYear; year--) {
//     const option = document.createElement("option");
//     option.value = year;
//     option.textContent = year;
//     yearSelect.appendChild(option);
// }

// monthSelect.addEventListener("change", updateDays);
// yearSelect.addEventListener("change", updateDays);
// updateDays();

// Account login/signup setup ends here
