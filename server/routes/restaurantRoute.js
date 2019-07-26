const express = require('express');
const router = express.Router();
const {
  getRestaurants,
  getRestaurant,
} = require('../controllers/restaurantController');

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);

module.exports = router;
