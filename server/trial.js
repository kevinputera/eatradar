const dotenv = require("dotenv");
const { getRestaurants } = require("./models/restaurantModel");

console.log(dotenv.config({ path: "../.env" }));

getRestaurants(0, 0, 1, 10)
    .then(console.log)
    .catch(console.log)
    .then(() => process.exit(0));
