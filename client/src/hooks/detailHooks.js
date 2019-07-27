import { useFetchServer } from './apiHooks';

/**
 * Wrapper on top of useFetchServer, used to get details of a restaurant.
 *
 * @param {number} id The restaurant's id
 * @return {Object} - The details of the restaurant
 */
export const useFetchDetails = id => {
  const reqParams = { method: 'GET' };
  const [data, isLoading] = useFetchServer(`/restaurants/${id}/details`, reqParams);
  if (data && data.google) {
    return [data.google, isLoading];
  }
  return [{}, isLoading];
};
