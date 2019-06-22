const express = require('express');
const restaurantService = require('../service/restaurantService');
const router = express.Router();
const response = require('../utils/response');

/**
 * Get closest restaurants
 */
router.get('/', async (req,res) => {
  const params = {
    longitude: req.query.lng,
    latitude: req.query.lat,
    page: req.query.p || 1,
    pageSize: req.query.ps || 10,
    q: req.query.q || null
  };

  if (!params.longitude || !params.latitude) {
    response.sendBadRequest(
        res,
        `Both longitude and latitude must be appended 
        to the URI as query parameters`);
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
    response.sendBadRequest(
      res,
      'Page size must be greater than 10'
    );
    return;
  }

  try {
    const result = await restaurantService.getClosestRestaurants(params);
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
});

/**
 * Get single restaurant based on id
 */
router.get('/:id', (req, res) => {
  // res.json(restaurants.filter(restaurant => 
      // restaurant.id === parseInt(req.params.id)));
});

module.exports =  router;
