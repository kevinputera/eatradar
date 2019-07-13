import { get } from '../utils/http';

/**
 * Get the details of a restaurant
 *
 * @param {number} id
 * @return {Object} - details of a restaurant
 */
export const getDetails = async id => {
  try {
    const json = await get(`${process.env.REACT_APP_SERVER_URL}/details/${id}`);
    return json.data.google;
  } catch (e) {
    throw new Error(`Failed to fetch details: ${e.message}`);
  }
};
