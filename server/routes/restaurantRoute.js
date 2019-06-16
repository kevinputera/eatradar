const express = require('express');
const restaurantService = require('../service/restaurantService');
const router = express.Router();

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
    res.status(400).send(
        `Both longitude and latitude must be appended 
         to the URI as query parameters`);
    return;
  }

  if (params.page <= 0) {
    res.status(400).send(
        'Page query parameter[p] must be greater than zero');
    return;
  }

  if (params.pageSize < 10) {
    res.status(400).send(
        'Page size must be greater than 10');
    return;
  }

  try {
    const result = await restaurantService.getClosestRestaurants(params);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send(e.message);
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
