const express = require('express');
const restaurantService = require('../service/restaurantService');
const router = express.Router();

// Get all Restaurants
router.get('/', async (req,res) => {
  const longitude = req.query.lng;
  const latitude = req.query.lat;
  let page = req.query.p;
  let pageSize = req.query.ps;

  if (longitude === null || latitude === null) {
    res.status(400).send(
        `Both longitude and latitude must be appended 
         to the URI as query parameters`);
    return;
  }

  if (page <= 0) {
    res.status(400).send(
        'Page query parameter[p] must be greater than zero');
    return;
  }

  if (pageSize < 10) {
    res.status(400).send(
        'Page size must be greater than 10');
    return;
  }

  try {
    const result = await restaurantService.getRestaurants(
        longitude, latitude, page, pageSize);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get Single Restaurant based on id
router.get('/:id', (req, res) => {
  // res.json(restaurants.filter(restaurant => 
      // restaurant.id === parseInt(req.params.id)));
});

module.exports =  router;
