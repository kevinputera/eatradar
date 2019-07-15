const express = require('express');
const router = express.Router();
const restaurantService = require('../service/restaurantService');
const response = require('../utils/response');

/**
 * Get all restaurants in Singapore in the form of GeoJSON data
 */
router.get('/', async (req, res) => {
  try {
    const result = await restaurantService.getRestaurantLocationsGeoJSON(
      req.query.q
    );
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
});

module.exports = router;
