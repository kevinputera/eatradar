import { get } from '../utils/http';

/**
 * Get the ratings and reviews of a restaurant
 *
 * @param {number} id
 * @return {Object} - ratings and reviews of a restaurant
 */
export const getReviews = async id => {
  try {
    const json = await get(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}`);
    return json.data;
  } catch (e) {
    throw new Error(`Failed to fetch reviews: ${e.message}`);
  }
};
