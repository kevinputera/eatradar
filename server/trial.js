const { getRestaurants } = require("./service/restaurantService");

getRestaurants(0, 0, 1, 10)
    .then(console.log)
    .catch(console.log)
    .then(() => process.exit(0));
