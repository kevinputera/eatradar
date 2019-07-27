const restaurantService = require('./restaurantService');
const googlePlacesApiService = require('./googlePlacesApiService');
const yelpApiService = require('./yelpApiService');

/**
 * Get details of a given restaurant id
 *
 * @param {number} id
 * @return {Promise<Object>} - restaurant details
 */
exports.getDetails = async id => {
  try {
    const details = {};
    const googlePlaceId = await restaurantService.getGooglePlacesId(id);
    if (googlePlaceId) {
      const googleDetails = await googlePlacesApiService.getDetails({
        placeId: googlePlaceId,
        language: 'en',
      });
      details['google'] = googleDetails;
    }
    return details;
  } catch (e) {
    const message = `detailService.js: error in getDetails\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};
