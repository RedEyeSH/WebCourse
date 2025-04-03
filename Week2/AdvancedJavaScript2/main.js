import { restaurantRow, getRestaurants } from './components.js';

const main = async () => {
  try {
    await getRestaurants();

    const select = document.querySelector("#select");
    select.addEventListener("change", restaurantRow);

    restaurantRow();
  } catch (error) {
    console.error(error);
  }
};

main();