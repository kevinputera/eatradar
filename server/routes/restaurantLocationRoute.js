const express = require('express');
const router = express.Router();
const {
  getRestaurantLocations,
} = require('../controllers/restaurantLocationController');

router.get('/', getRestaurantLocations);

module.exports = router;
