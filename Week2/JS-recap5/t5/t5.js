"use strict";

import { fetchData } from "../../../lib/fetchData.js";

const apiUrl = "https://media2.edu.metropolia.fi/restaurant/api/v1";
const get_table = document.querySelector("table");
const dialog = document.querySelector("dialog");

const style = document.createElement("style");
style.innerHTML = `
  .highlight {
    background-color: rgb(0, 0, 0, 0.2);
    font-weight: bold;
  }
`;

document.body.append(style);

async function getRestaurants() {
  let restaurants = await fetchData(`${apiUrl}/restaurants`);
  if (!restaurants) return;

  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  displayRestaurants(restaurants);
}

function displayRestaurants(restaurants) {
  restaurants.forEach((restaurant) => {
    const tr = document.createElement("tr");

    tr.addEventListener("click", async () => {
      document
        .querySelectorAll(".highlight")
        .forEach((el) => el.classList.remove("highlight"));
      tr.classList.add("highlight");

      const menuData = await fetchData(
        `${apiUrl}/restaurants/daily/${restaurant._id}/fi`
      );
      showModal(restaurant, menuData?.courses || [], tr);
    });

    const tdName = document.createElement("td");
    tdName.textContent = restaurant.name;

    const tdAddress = document.createElement("td");
    tdAddress.textContent = restaurant.address;

    tr.append(tdName, tdAddress);
    get_table.append(tr);
  });
}

function showModal(restaurant, menu, tr) {
  dialog.innerHTML = "";

  const h3Name = document.createElement("h3");
  h3Name.textContent = restaurant.name;

  const pAddress = document.createElement("p");
  pAddress.textContent = `Address: ${restaurant.address}`;

  const pCity = document.createElement("p");
  pCity.textContent = `City: ${restaurant.city}`;

  const pPhoneNumber = document.createElement("p");
  pPhoneNumber.textContent = `Phone: ${restaurant.phone}`;

  const menuTitle = document.createElement("h4");
  menuTitle.textContent = "Today's Menu";

  const menuList = document.createElement("ul");
  if (menu.length > 0) {
    menu.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price ? item.price : "No price set"} (${item.diets})`;
      menuList.append(li);
    });
  } else {
    menuList.innerHTML = "<p>No menu available</p>";
  }

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    tr.classList.remove("highlight");
    dialog.close();
  });

  dialog.append(
    h3Name,
    pAddress,
    pCity,
    pPhoneNumber,
    menuTitle,
    menuList,
    closeButton
  );
  dialog.showModal();
}

getRestaurants();
