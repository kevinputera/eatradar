const restaurantService = require('./restaurantService');
const googlePlacesApiService = require('./googlePlacesApiService');
const yelpApiService = require('./yelpApiService');

/**
 * Get reviews of a given restaurant id
 *
 * @param {number} id
 * @return {Promise<Object>} - reviews
 */
exports.getReviews = async id => {
  try {
    const reviews = {};
    const res = await Promise.all([
      restaurantService.getGooglePlacesId(id),
      restaurantService.getYelpId(id),
    ]);

    const placeId = {
      googleId: res[0],
      yelpId: res[1],
    };

    if (placeId.googleId) {
      const googleReviews = await googlePlacesApiService.getReviews({
        placeId: placeId.googleId,
        language: 'en',
      });
      reviews['google'] = googleReviews;
    }

    if (placeId.yelpId) {
      const yelpReviews = await yelpApiService.getReviews(placeId.yelpId);
      reviews['yelp'] = yelpReviews;
    }

    return reviews;
  } catch (e) {
    const message = `reviewService.js: error in getReviews\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};
