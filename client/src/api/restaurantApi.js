import { get } from '../utils/http';

/**
 * Get restaurants, filter by params
 *
 * @param {Object} params
 * @param {number} params.lat
 * @param {number} params.lng
 * @param {number} [params.page]
 * @param {number} [params.pageSize]
 * @param {string} [params.q]
 * @return {Object} - Restaurants
 */
export const getRestaurants = async params => {
  try {
    const json = await get(`${process.env.REACT_APP_SERVER_URL}/restaurants`, {
      qs: params,
    });
    return json.data;
  } catch (e) {
    throw new Error(`Failed to fetch restaurants: ${e.message}`);
  }
};

/**
 * Get a single restaurant details
 *
 * @param id The id of the restaurant
 * @return {Object} - The restaurant entity
 */
export const getRestaurant = async id => {
  try {
    const json = await get(
      `${process.env.REACT_APP_SERVER_URL}/restaurants/${id}`
    );
    return json.data;
  } catch (e) {
    throw new Error(`Failed to fetch restaurant: ${e.message}`);
  }
};
