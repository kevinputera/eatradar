const { placesClient } = require('../config/googlePlacesConfig');

/**
 * Get Google Places' details of a restaurant
 * 
 * @param {Object} params
 * @param {string} params.placeId
 * @param {language} [params.language]
 * @return {Promise<Object>} - restaurant details
 */
exports.getDetails = async (params) => {
  try {
    const res = await placesClient.place({
      placeid: params.placeId,
      language: params.language || 'en',
      fields: [
          'opening_hours', 
          'international_phone_number'
      ]
    }).asPromise();

    return res.json.result;
  } catch (e) {
    const message = `googlePlacesApiService.js: error in getDetails\n${e}`;
    console.log(message);
    throw new Error(message);
  }
}

/**
 * Get Google Places' rating and reviews of a restaurant
 * 
 * @param {Object} params
 * @param {string} params.placeId
 * @param {language} [params.language]
 * @return {Promise<Object>} - rating and review
 */
exports.getReviews = async (params) => {
  try {
    const res = await placesClient.place({
      placeid: params.placeId,
      language: params.language || 'en',
      fields: [
          'rating', 
          'review'
      ]
    }).asPromise();

    return res.json.result;
  } catch (e) {
    const message = `googlePlacesApiService.js: error in getReviews\n${e}`;
    console.log(message);
    throw new Error(message);
  }
},

/**
 * Get Google Places' place_id of a location
 * 
 * @param {Object} params
 * @param {string} params.input
 * @param {number} params.latitude
 * @param {number} params.longitude
 * @param {string} [params.inputtype]
 * @param {string} [params.language]
 * @return {Promise<string>} - place id 
 */
exports.getPlaceId = async (params) => {
  try {
    const res = await placesClient.findPlace({
      input: params.input,
      inputtype: params.inputtype || 'textquery',
      language: params.language || 'en',
      locationbias: `point:${params.latitude},${params.longitude}`,
      fields: ['place_id']
    }).asPromise();

    return res.json.candidates[0].place_id;
  } catch (e) {
    const message = `googlePlacesApiService.js: error in getPlaceId\n${e}`;
    console.log(message);
    throw new Error(message);
  }
},

/**
 * Refresh Google Places' place_id of a restaurant
 * 
 * @param {string} placeId
 * @return {Optional<string>} - place_id
 */
exports.refreshPlaceId = async (placeId) => {
  try {
    const res = await placesClient.place({
      placeid: placeId,
      fields: ['place_id']
    }).asPromise();

    return res.json.result.place_id;
  } catch (e) {
    const message = `googlePlacesApiService.js: error in refreshPlaceId\n${e}`;
    console.log(message);
    throw new Error(message);
  }
}