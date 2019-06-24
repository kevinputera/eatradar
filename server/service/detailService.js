const restaurantService = require('./restaurantService');
const googlePlacesApiService = require('./googlePlacesApiService');

/**
 * Get details of a given restaurant id
 *
 * @param {number} id
 * @return {Promise<Object>} - restaurant details
 */
exports.getDetails = async id => {
  try {
    const placeId = await restaurantService.getGooglePlacesId(id);
    const details = await googlePlacesApiService.getDetails({
      placeId: placeId,
      language: 'en',
    });

    return { google: details };
  } catch (e) {
    const message = `detailService.js: error in getDetails\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};
