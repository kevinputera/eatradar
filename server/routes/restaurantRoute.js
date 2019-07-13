const express = require('express');
const router = express.Router();
const restaurantService = require('../service/restaurantService');
const response = require('../utils/response');

/**
 * Get restaurants based on location.
 */
router.get('/', async (req, res) => {
  const params = {
    longitude: req.query.lng,
    latitude: req.query.lat,
    offset: req.query.offset || 0,
    limit: req.query.limit || 10,
    q: req.query.q || null,
  };

  if (!params.longitude || !params.latitude) {
    response.sendBadRequest(
      res,
      `Both lng and lat must be appended to the URI as query parameters`
    );
    return;
  }

  if (params.offset < 0) {
    response.sendBadRequest(
      res,
      'Offset query parameter must be greater than or equal to zero'
    );
    return;
  }

  if (params.limit < 10) {
    response.sendBadRequest(res, 'Limit must be greater than 10');
    return;
  }

  try {
    const result = await restaurantService.getRestaurants(params);
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
});

/**
 * Get a single restaurant by its id.
 */
router.get('/:id', async (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id);
  } catch (e) {
    response.sendBadRequest(res, 'Id must be of type number');
    return;
  }

  if (!id || id < 0) {
    response.sendBadRequest(
      res,
      'A correct id must be included in the request URI'
    );
    return;
  }

  try {
    const result = await restaurantService.getRestaurant(id);
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
});

module.exports = router;
