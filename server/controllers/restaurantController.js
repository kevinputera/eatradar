const restaurantService = require('../service/restaurantService');
const response = require('../utils/response');

/**
 * Get restaurants based on location.
 */
async function getRestaurants(req, res) {
  const params = {
    longitude: parseFloat(req.query.lng),
    latitude: parseFloat(req.query.lat),
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 10,
  };

  if (req.query.q) {
    params.q = req.query.q;
  }

  if (
    !Number.isFinite(params.longitude) ||
    !Number.isFinite(params.latitude)
  ) {
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
}

/**
 * Get a single restaurant by its id.
 */
async function getRestaurant(req, res) {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    response.sendBadRequest(res, 'Id must be of type number');
    return;
  }

  if (id < 0) {
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
}

module.exports = { getRestaurants, getRestaurant };
