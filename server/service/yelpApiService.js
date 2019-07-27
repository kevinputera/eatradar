const fetch = require('node-fetch');
const queryString = require('querystring');

/**
 * Helper function to send request to yelp's business endpoint.
 *
 * @param {string} resource
 * @return {Promise<Object>} The json result
 */
async function queryYelpBusinessEndpoint(resource) {
  const urlBusiness = 'https://api.yelp.com/v3/businesses';
  const yelpKey = process.env.YELP_API_KEY;
  const bearer = 'Bearer ' + yelpKey;

  const url = urlBusiness + resource;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching data. HTTP status: ${res.status}`);
  }

  return await res.json();
}

/**
 * Get place of a given restaurant id
 *
 * @param {object} params
 * @param {string} params.term
 * @param {number} params.longitude
 * @param {number} params.latitude
 * @return {Promise<String>} - yelp id of place
 */

exports.getPlaceId = async params => {
  try {
    const idQuery = {
      term: params.term,
      longitude: params.longitude,
      latitude: params.latitude,
    };
    const resource = '/search?' + queryString.stringify(idQuery);
    const json = await queryYelpBusinessEndpoint(resource);
    if (json.businesses.length) {
      return json.businesses[0].id;
    }
    return null;
  } catch (e) {
    const message = `yelpApiService.js: Error in getId\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};

/**
 * Get ratings and reviews of a restaurant
 *
 * @param {string} id The yelp_id of the restaurant
 * @return {Promise<Object>} - ratings and reviews of a restaurant
 */
exports.getRatingReviews = async id => {
  try {
    const ratingReviews = await Promise.all([
      exports.getRating(id),
      exports.getReviews(id),
    ]);
    return {
      rating: ratingReviews[0],
      reviews: ratingReviews[1],
    };
  } catch (e) {
    const message = `yelpApiService.js: Error in getRatingReviews\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};

/**
 * Get reviews of a given restaurant id
 *
 * @param {string} id Id should be the actual yelp_id as it queries yelps api
 * @return {Promise<Object>} - reviews from yelp
 */
exports.getReviews = async id => {
  try {
    const resource = `/${id}/reviews`;
    const json = await queryYelpBusinessEndpoint(resource);
    return json.reviews.map(review => ({
      author_name: review.user.name,
      text: review.text,
      rating: review.rating,
      time: review.time_created,
    }));
  } catch (e) {
    const message = `yelpApiService.js: Error in getReviews\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};

/**
 * Get overall rating of a given restaurant
 *
 * @param {string} id The yelp_id of this restaurant
 * @return {Promise<number>} - The rating
 */
exports.getRating = async id => {
  try {
    const resource = `/${id}`;
    const json = await queryYelpBusinessEndpoint(resource);
    return json.rating;
  } catch (e) {
    const message = `yelpApiService.js: Error in getRating\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};
