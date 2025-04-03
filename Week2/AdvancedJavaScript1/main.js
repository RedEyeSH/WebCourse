import {restaurantRow, getRestaurants} from './components.js';

const main = async () => {
  try {
    await getRestaurants();
    restaurantRow();
  } catch (error) {
    console.error(error);
  }
};

main();