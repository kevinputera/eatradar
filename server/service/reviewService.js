const restaurantService = require('./restaurantService');
const googlePlacesApiService = require('./googlePlacesApiService');

/**
 * Get reviews of a given restaurant id
 *
 * @param {number} id
 * @return {Promise<Object>} - reviews
 */
exports.getReviews = async id => {
  try {
    const placeId = await restaurantService.getGooglePlacesId(id);
    const reviews = await googlePlacesApiService.getReviews({
      placeId: placeId,
      language: 'en',
    });

    return { google: reviews };
  } catch (e) {
    const message = `reviewService.js: error in getReviews\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};
