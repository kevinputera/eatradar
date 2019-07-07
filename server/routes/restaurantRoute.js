const express = require('express');
const router = express.Router();
const restaurantService = require('../service/restaurantService');
const response = require('../utils/response');

/**
 * Get all restaurants in Singapore in the form of GeoJSON data
 */
router.get('/', async (req, res) => {
  try {
    const result = await restaurantService.getRestaurants();
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
});

/**
 * Get closest restaurants based on location.
 */
router.get('/closest', async (req, res) => {
  const params = {
    longitude: req.query.lng,
    latitude: req.query.lat,
    page: req.query.p || 1,
    pageSize: req.query.ps || 10,
    q: req.query.q || null,
  };

  if (!params.longitude || !params.latitude) {
    response.sendBadRequest(
      res,
      `Both longitude and latitude must be appended 
        to the URI as query parameters`
    );
    return;
  }

  if (params.page <= 0) {
    response.sendBadRequest(
      res,
      'Page query parameter[p] must be greater than zero'
    );
    return;
  }

  if (params.pageSize < 10) {
    response.sendBadRequest(res, 'Page size must be greater than 10');
    return;
  }

  try {
    const result = await restaurantService.getClosestRestaurants(params);
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
});

module.exports = router;
