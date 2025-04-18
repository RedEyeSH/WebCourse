import { fetchData } from './lib/fetchData.js';
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

function removeProfileClasses() {
    const profile = document.getElementById("profile");
    profile.classList.remove("open-profile-section");

    const profile_container = document.getElementById("profile-container");
    profile_container.classList.remove("open-profile-container");

    const close_profile_bOverlay = document.getElementById("profile-box-overlay");
    close_profile_bOverlay.classList.remove("show-profile-box-overlay");
}

const close_form = document.querySelectorAll("#x-close-form");
close_form.forEach((button) => {
    button.addEventListener('click', removeAccountClasses);
});

const close_form_bOverlay = document.getElementById("box-overlay");
close_form_bOverlay.addEventListener('click', removeAccountClasses);

// handling the sign up confirmation password here
// (Haven't done yet)

// Account login/signup setup ends here
const apiUrl = "https://media2.edu.metropolia.fi/restaurant/api/v1";
const imgUrl = "https://media2.edu.metropolia.fi/restaurant/uploads";

// Restaurant search api starts here
let active_dropdown = null;
const selected_filters = {
    city: "All cities", 
    company: "All companies"
};

const create_dropdown = (data_type, button, data, select_box) => {
    button.addEventListener('click', async (e) => {
        e.stopPropagation();

        button.querySelector("i").classList.toggle("rotate-icon");

        if (active_dropdown && (active_dropdown !== select_box)) {
            active_dropdown.querySelector(".search-option-box").remove();
            active_dropdown.querySelector("i").classList.remove("rotate-icon");
        }

        let existing_dropdown = select_box.querySelector(".search-option-box");
        if (existing_dropdown) {
            existing_dropdown.remove();
            button.querySelector("i").classList.remove("rotate-icon");
            active_dropdown = null;
            return;
        }

        if (data.length === 0) {
            try {
                const allRestaurants = await fetchData(`${apiUrl}/restaurants`);
                
                if (!allRestaurants) throw new Error("Failed to fetch restaurants.");

                if (data_type === "city") {
                    data = ["All cities", ...new Set(allRestaurants.map(item => item.city))];
                } else if (data_type === "company") {
                    data = ["All companies", ...new Set(allRestaurants.map(item => item.company))];
                }
            } catch (error) {
                console.log(error);
            }
        }

        const div = document.createElement("div");
        div.classList.toggle("search-option-box");

        const ul = document.createElement("ul");

        data.forEach((item) => {
            const li = document.createElement("li");
            li.innerText = item;
            li.addEventListener('click', () => {
                button.innerHTML = `${item} <i class="fa-solid fa-angle-down"></i>`;
                button.querySelector("i").classList.remove("rotate-icon");
            
                selected_filters[data_type] = item;
                // console.log(selected_filters);

                // call getRestaurants to update displayed restaurants
                getRestaurants();
            });
            ul.append(li);
        });
        div.append(ul);
        select_box.append(div);

        div.addEventListener('animationend', () => {
            div.style.overflowY = 'auto';
        });

        active_dropdown = select_box;
    });

    document.addEventListener('click', () => {
        const dropdown = select_box.querySelector(".search-option-box");
        if (dropdown) {
            dropdown.remove();
            button.querySelector("i").classList.remove("rotate-icon");
        } 
        active_dropdown = null;
    });
};

const getCities = () => {
    const data_type = "city";
    const select_city_button = document.getElementById("select-city-button");
    const city_names = [];
    const city_select_box = document.getElementById("city-select-box");

    create_dropdown(data_type, select_city_button, city_names, city_select_box);
};

getCities();

const getCompanyNames = () => {
    const data_type = "company";
    const select_company_button = document.getElementById("select-company-button");
    const company_names = [];
    const company_select_box = document.getElementById("company-select-box");

    create_dropdown(data_type, select_company_button, company_names, company_select_box);
};

getCompanyNames();
// Restaurant search api ends here

// Restaurant cards/boxes starts here
const getRestaurants = async (search_text = "", favourite_restaurant_id = null) => {
    try {
        const allRestaurants = await fetchData(`${apiUrl}/restaurants`);
        if (!allRestaurants) throw new Error("Failed to fetch restaurants.");

        const restaurant_section = document.querySelector(".restaurant");
        restaurant_section.innerHTML = "";

        const filtered_restaurants = allRestaurants.filter(restaurant => {
            // restaurant.name.toLowerCase().includes(search_text.toLowerCase())
            const match_search_text = restaurant.name.toLowerCase().includes(search_text.toLowerCase());
            const match_city = selected_filters.city === "All cities" || restaurant.city === selected_filters.city;
            const match_company = selected_filters.company === "All companies" || restaurant.company === selected_filters.company;
            return match_search_text && match_city && match_company;
        });

        // console.log(filtered_restaurants);

        let total_restaurants = filtered_restaurants.length;
        const container_count = Math.ceil(total_restaurants / 3);

        if (total_restaurants <= 0) {
            const p_total_restaurant = document.createElement("p");
            p_total_restaurant.innerHTML = "";
        }

        let currentIndex = 0;

        for (let i = 0; i < container_count; i++) {
            // Creating 3 boxes per 1 restaurant container div
            const restaurant_container = document.createElement("div");
            restaurant_container.classList.add("restaurant-container");
            for (let j = 0; j < 3; j++) {
                if (currentIndex >= filtered_restaurants.length) break;

                const restaurant = filtered_restaurants[currentIndex];

                // being created while restaurant container can have 3 boxes
                const restaurant_box = document.createElement("div");
                restaurant_box.classList.add("restaurant-box");

                const restaurant_box_header = document.createElement("div");
                restaurant_box_header.classList.add("restaurant-box-header");

                const h2_name_city = document.createElement("h2");
                h2_name_city.innerHTML = `${restaurant.name}, ${restaurant.city}`;

                const i_heart = document.createElement("i");
                i_heart.classList.add("fa-regular", "fa-heart");
                i_heart.setAttribute("data-id", restaurant._id);
                
                if (favourite_restaurant_id && restaurant._id === favourite_restaurant_id) {
                    i_heart.classList.add("activate-heart");
                }

                const restaurant_box_description = document.createElement("div");
                restaurant_box_description.classList.add("restaurant-box-description");

                const p_description = document.createElement("p");
                p_description.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque officia aperiam ratione consectetur pariatur quasi quis et animi esse laborum consequatur hic, officiis libero accusantium quaerat asperiores non doloribus numquam."

                const restaurant_box_info = document.createElement("div");
                restaurant_box_info.classList.add("restaurant-box-info");

                const restaurant_box_info_address = document.createElement("div");
                restaurant_box_info_address.classList.add("restaurant-box-info-address");
                
                const i_location = document.createElement("i");
                i_location.classList.add("fa-solid", "fa-location-dot");

                const h4_address_postalCode = document.createElement("h4");
                h4_address_postalCode.innerHTML = `${restaurant.address}, ${restaurant.postalCode}`;
                
                const restaurant_box_info_visit = document.createElement("div");
                restaurant_box_info_visit.classList.add("restaurant-box-info-visit");
                restaurant_box_info_visit.setAttribute("data-index", currentIndex);

                const h3_open = document.createElement("h3");
                h3_open.innerHTML = "Open";
                
                restaurant_box_header.append(h2_name_city, i_heart);
                restaurant_box_description.append(p_description);
                restaurant_box_info_address.append(i_location, h4_address_postalCode);
                restaurant_box_info_visit.append(h3_open);
                restaurant_box_info.append(restaurant_box_info_address, restaurant_box_info_visit);

                restaurant_box.append(
                    restaurant_box_header, 
                    restaurant_box_description,
                    restaurant_box_info
                );

                restaurant_container.append(restaurant_box);
                restaurant_section.appendChild(restaurant_container);
                currentIndex++;
            };
        };

        // Fa-heart icon activation after clicking on the heart icon
        let favourite_restaurant = null;
        
        const restaurant_box_header = document.querySelectorAll(".restaurant-box-header i");
        restaurant_box_header.forEach((heart) => {
            heart.addEventListener('click', async () => {
                const restaurant_id = heart.getAttribute("data-id");

                document.querySelectorAll(".restaurant-box-header i.activate-heart").forEach(activeHeart => {
                    activeHeart.classList.remove("activate-heart");
                });

                let restaurant_name;
                if (restaurant_id) {
                    restaurant_name = await getRestaurantNameById(restaurant_id);
                }

                console.log(restaurant_name);
                
                if (favourite_restaurant && favourite_restaurant !== heart) {
                    favourite_restaurant.classList.remove("activate-heart");
                }

                const isActive = heart.classList.toggle("activate-heart");

                favourite_restaurant = isActive ? heart : null;
                
                try {
                    const token = localStorage.getItem("token");
                    const options = {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            favouriteRestaurant: isActive ? restaurant_id : null
                        })
                    }
                    const result = await fetchData(`${apiUrl}/users`, options);
                    console.log("Updated favorite restaurant:", result.data.favouriteRestaurant);
                } catch (error) {
                    console.error(error);
                }
            });
        })
        
        // Opens the restaurant's information after pressing a "Open" button
        const information = document.getElementById("information");
        const information_container = document.getElementById("information-container");

        // handling section for opening and displays restaurant's menu
        const restaurant_open_info = document.querySelectorAll(".restaurant-box-info-visit");
        restaurant_open_info.forEach((btn) => {
            btn.addEventListener('click', async () => {
                const index = btn.getAttribute("data-index");
                const restaurant = filtered_restaurants[index];

                // Animation for opening information section
                information.classList.toggle("open-information-section");
                information_container.classList.toggle("open-information-container");
                document.getElementById("information-box-overlay").classList.toggle("show-information-box-overlay");
               
                const information_header_h2 = document.querySelector("#information-header h2");
                information_header_h2.innerHTML = `${restaurant.name}, ${restaurant.city}`;

                const information_menu= document.querySelector(".information-menu");
                information_menu.textContent = "";

                // Fetch weekly menu data for the selected restaurant using its ID
                const restaurant_id = restaurant._id;
                const weekly_menu = await getWeeklyMenu(restaurant_id, "fi");
                console.log(restaurant_id);
                console.log(weekly_menu.days);
                // console.log(weekly_menu.days[0].courses);
                
                const information_date_ul = document.querySelector(".information-date ul");
                // const information_date_li = document.querySelectorAll(".information-date li");

                information_date_ul.innerHTML = "";

                const header_li = document.createElement("li");
                header_li.textContent = "This week";
                information_date_ul.append(header_li);
                
                const information_details = document.querySelector(".information-details");
                information_details.textContent = "";

                const h4_name = document.createElement("h4");
                h4_name.innerHTML = restaurant?.name;
                
                const p_address = document.createElement("p");
                p_address.innerHTML = restaurant?.address;

                const p_postalCode_city = document.createElement("p");
                p_postalCode_city.innerHTML = `${restaurant?.postalCode}, ${restaurant?.city}`;
                
                const p_company_phone = document.createElement("p");
                p_company_phone.innerHTML = `${restaurant?.company}, ${restaurant?.phone}`;

                information_details.append(
                    h4_name,
                    p_address,
                    p_postalCode_city,
                    p_company_phone
                );

                const menu_box = [];
                
                weekly_menu.days.forEach((data, index) => {
                    // console.log(data);
                    const li = document.createElement("li");
                    li.textContent = data?.date;
                    li.classList.add("date-list-item");
                    li.dataset.index = index;

                    information_date_ul.append(li);
    
                    // Create menu div
                    const div = document.createElement("div");
                    div.classList.add("information-menu-list");
                    div.dataset.index = index;

                    const h3_date = document.createElement("h3");
                    h3_date.textContent = data?.date;

                    div.append(h3_date);

                    data.courses.forEach((course) => {
                        const meal_description = document.createElement("p");
                        meal_description.textContent = `
                            ${course.name ? course?.name : "No menu available"} - 
                            ${course.price ? course?.price : "Unset Price"} - 
                            ${course.diets ? course.diets : "Unset Diets"}
                        `;
                        div.append(meal_description);
                    });
                    menu_box.push(div);
                    information_menu.append(div)
                });

                const information_date_li = document.querySelectorAll(".information-date li");

                information_date_li[0].classList.add("activate-li-date");

                information_date_li.forEach((li, element_index) => {
                    li.addEventListener('click', () => {
                        information_date_li.forEach(li => li.classList.remove("activate-li-date"));
                        li.classList.toggle("activate-li-date");

                        if (element_index === 0) {
                            menu_box.forEach(div => div.style.display = "block");
                        } else {
                            menu_box.forEach((div, menu_box_index) => {
                                div.style.display = (menu_box_index === element_index - 1) ? "block" : "none";
                            });
                        }
                    });
                });
            });
        });

        // Close the restaurant's information section
        const close_information_bOverlay = document.getElementById("information-box-overlay");
        
        function closeInformation() {
            information.classList.remove("open-information-section");
            information_container.classList.remove("open-information-container");
            close_information_bOverlay.classList.remove("show-information-box-overlay");

            const information_date_li = document.querySelectorAll(".information-date li");
            information_date_li.forEach(element => element.classList.remove("activate-li-date"));
            console.log(information_date_li)
        }

        const close_information = document.getElementById("x-close-information");
        close_information.addEventListener('click', closeInformation);

        close_information_bOverlay.addEventListener('click', closeInformation);

    } catch (error) {
        console.log(error);
    };
};

getRestaurants();

const searchInput = document.getElementById("search-restaurant-input");

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value;
    getRestaurants(searchValue);
});


const getWeeklyMenu = async (restaurantId, lang = "en") => {
    try {
        const data = await fetchData(`${apiUrl}/restaurants/weekly/${restaurantId}/${lang}`);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
// Restaurant cards/boxes ends here

// Restaurant's information section starts here
// planned to be inside getRestaurants()
// Restaurant's information section ends here

// SignupLogin setup
console.log(apiUrl);

const createAccount = async () => {
    const signup_username = document.getElementById("signup-username").value;
    const signup_email = document.getElementById("signup-email").value;
    const signup_password = document.getElementById("signup-password").value;
    const signup_password_confirmation = document.getElementById("signup-password-confirmation").value;

    const signup_email_div = document.querySelector(".signup-email");
    const signup_password_confirmation_div = document.querySelector(".signup-password-confirmation");
    
    const existing_error = signup_password_confirmation_div.querySelector("p");
    if (existing_error) {
        existing_error.remove();
    }

    if (signup_password !== signup_password_confirmation) {
        const p_password_error = document.createElement("p");
        p_password_error.innerHTML = "Password do not match!";
        p_password_error.style.color = "red";
        signup_password_confirmation_div.insertBefore(p_password_error, signup_password_confirmation_div.querySelector("input"));
        return;
    }

    console.log("Username:", signup_username);
    console.log("Email:", signup_email);
    console.log("Password:", signup_password);
    
    const options = {
        method: "POST",
        body: JSON.stringify({
            "username": signup_username,
            "password": signup_password,
            "email": signup_email
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const response = await fetch(`${apiUrl}/users`, options);

        console.log(response);

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message && errorData.message.toLowerCase().includes("already exists")) {
                const email_field = document.querySelector(".signup-email");
                const existing_error = email_field.querySelector("p");
                if (!existing_error) {
                    const p_email_exists = document.createElement("p");
                    p_email_exists.innerHTML = "This email is already taken.";
                    p_email_exists.style.color = "red";
                    signup_email_div.insertBefore(p_email_exists, signup_email_div.querySelector("input"));
                }
            } else {
                console.error("Error creating account:", errorData);
            }
        } else {
            console.log("Account created successfully:", response);

            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify({
                        "username": signup_username,
                        "password": signup_password,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            
                const data = await fetchData(`${apiUrl}/auth/login`, options);

                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.data.username);

                logged_in(data.data.username);

            } catch (error) {
                console.error(error);
            }
            removeAccountClasses();
        }
    } catch (error) {
        console.error(error);
    }
}

const signup_data_form = document.querySelector(".signup-form form");
signup_data_form.addEventListener("submit", (e) => {
    e.preventDefault();
    createAccount(); 
});

const login = async () => {
    const login_username = document.getElementById("login-username").value;
    const login_password = document.getElementById("login-password").value;

    const login_password_div = document.querySelector(".login-password");

    const existing_error = login_password_div.querySelector("p");
    if (existing_error) {
        existing_error.remove();
    }

    const options = {
        method: "POST",
        body: JSON.stringify({
            "username": login_username,
            "password": login_password,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const response = await fetch(`${apiUrl}/auth/login`, options);

        if (!response.ok) {
            const errorData = await response.json();
            const p_login_error = document.createElement("p");
            p_login_error.style.color = "red";

            if (errorData.message && errorData.message.toLowerCase().includes("incorrect username/password")) {
                p_login_error.innerHTML = "Incorrect email or password.";
            } else {
                p_login_error.innerHTML = "Login failed. Please try again.";
            }

            login_password_div.append(p_login_error);
        } else {
            const data = await response.json();
            console.log("Logged in successfully!", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.data.username);

            logged_in();

            removeAccountClasses();
        }
    } catch (error) {
        console.error(error);
    }
}

const login_data_form = document.querySelector(".login-form form");
login_data_form.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
});

const getRestaurantNameById = async (restaurant_id) => {
    try {
        const restaurant = await fetchData(`${apiUrl}/restaurants/${restaurant_id}`);
        if (restaurant && restaurant.name) {
            return restaurant.name;
        } else {
            console.error("Restaurant not found or missing name.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching restaurant by id", error);
        return null;
    }
}

// after login/signup
const logged_in = async (username) => {
    const navbar = document.querySelector(".navbar");
    const navbar_login = document.getElementById("navbar-login");

    if (navbar_login) {
        navbar_login.remove();
    }

    const token = localStorage.getItem("token");
    const data = await fetchData(`${apiUrl}/users/token`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });


    console.log(data);

    getRestaurants("", data.favouriteRestaurant);

    const navbar_icon_div = document.createElement("div");
    navbar_icon_div.className = "navbar-icon";

    let user_icon;
    let profile_icon;
    if (data?.avatar) {
        user_icon = document.createElement("img");
        user_icon.src = `${imgUrl}/${data.avatar}`;
        user_icon.alt = "navbar-user-avatar";

        profile_icon = document.createElement("img");
        profile_icon.src = `${imgUrl}/${data.avatar}`;
        profile_icon.alt = "profile-user-avatar";
    } else {
        user_icon = document.createElement("i");
        user_icon.className = "fa-solid fa-circle-user";

        profile_icon = document.createElement("i");
        profile_icon.className = "fa-solid fa-circle-user";
    }

    navbar_icon_div.append(user_icon);

    const username_text = document.createElement("p");
    username_text.textContent = data.username;

    const logout_btn = document.createElement("button");
    logout_btn.textContent = "Logout";
    logout_btn.style.marginLeft = "10px";
    logout_btn.onclick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        
        window.location.reload();
    };

    const navbar_logged_in = document.createElement("div");
    navbar_logged_in.className = "navbar-logged-in";
    navbar_logged_in.setAttribute("id", "navbar-logged-in");
    navbar_logged_in.append(navbar_icon_div);
    navbar_logged_in.append(username_text);
    // navbar_logged_in.append(logout_btn);

    navbar_logged_in.addEventListener('click', async () => {
        const profile = document.getElementById("profile");
        profile.classList.toggle("open-profile-section");

        const profile_container = document.getElementById("profile-container");
        profile_container.classList.toggle("open-profile-container");

        const profile_picture = document.querySelector(".profile-picture");
        const profile_upload = document.querySelector(".profile-upload");

        const profile_info = document.querySelector(".profile-info");

        const profile_info_username = document.getElementById("profile-username");
        profile_info_username.value = data.username;

        const profile_info_email = document.getElementById("profile-email");
        profile_info_email.value = data.email;

        getRestaurants("", data.favouriteRestaurant);

        console.log("current data:",data);

        const profile_info_favourite_restaurant = document.getElementById("profile-favourite-restaurant");
        profile_info_favourite_restaurant.textContent = await getRestaurantNameById(data.favouriteRestaurant);

        const close_profile_bOverlay = document.getElementById("profile-box-overlay");
        close_profile_bOverlay.classList.toggle("show-profile-box-overlay");

        close_profile_bOverlay.addEventListener("click", removeProfileClasses);

        const profile_picture_h2 = document.createElement("h2");
        profile_picture_h2.textContent = data.username;

        const profile_picture_h2_exist = document.querySelector(".profile-picture h2");
        if (profile_picture_h2_exist) profile_picture_h2_exist.remove();

        profile_picture.append(profile_picture_h2);

        const logout_btn = document.createElement("button");
        logout_btn.textContent = "Logout";
        logout_btn.style.marginLeft = "10px";
        logout_btn.onclick = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            
            window.location.reload();
        };

        if (logout_btn) {
            // logout_btn.remove();
        } else {
            // profile_container.append(logout_btn);
        }

        profile_upload.insertBefore(profile_icon, document.querySelector(".profile-upload input"));


        const profile_account_delete = document.querySelector(".profile-account-deletation");
        const delete_btn = document.createElement("button");
        delete_btn.setAttribute("id", "delete-account-btn");
        delete_btn.textContent = "Delete My Account";

        profile_account_delete.innerHTML = "";
        profile_account_delete.append(delete_btn);

        delete_btn.addEventListener("click", delete_account);

    });

    navbar.append(navbar_logged_in);
}

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
        logged_in(username);
    }
});

const picture_file = document.getElementById("picture-file");
const upload_avatar = async () => {
    const file = picture_file.files[0];

    if (!file) {
        alert("Please select an image.");
        return;
    }

    const form_data = new FormData();
    form_data.append("avatar", file);

    const token = localStorage.getItem("token");
    
    const options = {
        method: "POST",
        body: form_data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const result = await fetchData(`${apiUrl}/users/avatar`, options);

        console.log("Upload successful:", result);

        const navbar_icon = document.querySelector(".navbar-icon");
        navbar_icon.innerHTML = "";

        const profile_upload = document.querySelector(".profile-upload");

        const profile_user_icon = document.querySelector(".profile-upload .fa-solid.fa-circle-user");
        if (profile_user_icon) profile_user_icon.remove();

        // deletes the current user's img replace with a new one (img)
        const profile_user_img = document.querySelector(".profile-upload img");
        if (profile_user_img) profile_user_img.remove();

        const navbar_img = document.createElement("img");
        const profile_img = document.createElement("img");
        if (result.data.avatar) {
            navbar_img.src = `${imgUrl}/${result.data.avatar}`;
            navbar_img.style.display = "block";
            navbar_icon.append(navbar_img);

            profile_img.src = `${imgUrl}/${result.data.avatar}`;
            profile_img.style.display = "block";
            profile_upload.insertBefore(profile_img, document.querySelector(".profile-upload input"));
        }

    } catch (error) {
        console.error("Error uploading avatar:", error);
    }
}

picture_file.addEventListener("change", upload_avatar);

const delete_account = async () => {

    const token = localStorage.getItem("token");
    if (!confirm("Are you sure you want to delete your account? This action is irreversible!")) {
        return;
    }

    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const response = await fetch(`${apiUrl}/users`, options);

        console.log("Deleted:", response);

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload();
    } catch (error) {
        console.error("Error deleting account:", error);
    }
}

const getToken = async () => {
    try {
        const response = await fetchData(`${apiUrl}/users/token`);
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error);
    }
}

// getToken()

