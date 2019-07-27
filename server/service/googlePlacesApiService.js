const { placesClient } = require('../config/googlePlacesConfig');

/**
 * Get Google Places' details of a restaurant
 *
 * @param {Object} params
 * @param {string} params.placeId
 * @param {language} [params.language]
 * @return {Promise<Object>} - restaurant details
 */
exports.getDetails = async params => {
  try {
    const res = await placesClient
      .place({
        placeid: params.placeId,
        language: params.language || 'en',
        fields: ['opening_hours', 'international_phone_number', 'website', 'photo'],
      })
      .asPromise();

    let photos = [];
    if (res.json.result.photos) {
      photos = res.json.result.photos.map(photo => {
        const url = exports.getPhotoUrl({
          photoReference: photo.photo_reference,
          maxWidth: 400,
          maxHeight: 400,
        });
        return {
          html_attributions: photo.html_attributions,
          url,
        };
      });
    }

    return {
      phone_number: res.json.result.international_phone_number,
      opening_hours: res.json.result.opening_hours,
      photos,
      website: res.json.result.website,
    };
  } catch (e) {
    const message = `googlePlacesApiService.js: error in getDetails\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};

/**
 * Get Google Places' rating and reviews of a restaurant
 *
 * @param {Object} params
 * @param {string} params.placeId
 * @param {language} [params.language]
 * @return {Promise<Object>} - rating and review
 */
exports.getRatingReviews = async params => {
  try {
    const res = await placesClient
      .place({
        placeid: params.placeId,
        language: params.language || 'en',
        fields: ['rating', 'review'],
      })
      .asPromise();

    return res.json.result;
  } catch (e) {
    const message = `googlePlacesApiService.js: error in getRatingReviews\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};

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
exports.getPlaceId = async params => {
  try {
    const res = await placesClient
      .findPlace({
        input: params.input,
        inputtype: params.inputtype || 'textquery',
        language: params.language || 'en',
        locationbias: `point:${params.latitude},${params.longitude}`,
        fields: ['place_id'],
      })
      .asPromise();

    if (res.json.candidates.length) {
      return res.json.candidates[0].place_id;
    }
    return null;
  } catch (e) {
    const message = `googlePlacesApiService.js: error in getPlaceId\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};

/**
 * Create photos url form Googles' photo reference
 *
 * @param {Object} params
 * @param {string} params.photoReference
 * @param {number} [params.maxWidth]
 * @param {number} [params.maxHeight]
 * @return {string} - photo url
 */
exports.getPhotoUrl = params => {
  const uri = 'https://maps.googleapis.com/maps/api/place/photo';
  return (
    uri +
    `?key=${process.env.GOOGLE_MAPS_API_KEY_PHOTOS}` +
    `&photoreference=${params.photoReference}` +
    `&maxwidth=${params.maxWidth || 400}` +
    `&maxHeight=${params.maxHeight || 400}`
  );
};

/**
 * Refresh Google Places' place_id of a restaurant
 *
 * @param {string} placeId
 * @return {Optional<string>} - place_id
 */
exports.refreshPlaceId = async placeId => {
  try {
    const res = await placesClient
      .place({
        placeid: placeId,
        fields: ['place_id'],
      })
      .asPromise();

    return res.json.result.place_id;
  } catch (e) {
    const message = `googlePlacesApiService.js: error in refreshPlaceId\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};
