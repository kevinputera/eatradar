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
    const details={};
    const placeId = {
      googleId: await restaurantService.getGooglePlacesId(id),
      yelpId: await restaurantService.getYelpId(id),
    }
    if (placeId.googleId) {
      const googleDetails = await googlePlacesApiService.getDetails({
        placeId: placeId.googleId,
        language: 'en',
      });
      details['google'] = googleDetails;
    }
    if(placeId.yelpId){
      const yelpDetails = await yelpApiService.getDetails(placeId.yelpId);
      details['yelp'] = yelpDetails;
    }
    return details;
  } catch (e) {
    const message = `detailService.js: error in getDetails\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};
