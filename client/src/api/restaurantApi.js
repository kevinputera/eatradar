import http from '../utils/http';

/**
 * Get closest restaurants to a point, filter by params
 * 
 * @param {Object} params 
 * @param {number} params.lat
 * @param {number} params.lng
 * @param {number} [params.page]
 * @param {number} [params.pageSize]
 * @param {string} [params.q]
 * @return {Promise<Object>} - a list of restaurants
 */
export const getRestaurants = async params => {
  const res = await http.get('/restaurants', params);
  const json = await res.json();
  return json;
}