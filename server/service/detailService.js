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
    const res = await Promise.all([restaurantService.getGooglePlacesId(id), restaurantService.getYelpId(id)]);
    const placeId = {
      googleId: res[0],
      yelpId: res[1]
    };
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
