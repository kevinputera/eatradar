import { useState, useEffect, useMemo, useCallback } from 'react';
import { useFetchServer } from './apiHooks';

/**
 * Custom hook to get a paginated restaurant list result.
 *
 * @param {Object} params The parameters to customize the list returned
 * @param {number} params.lat The latitude position of the user
 * @param {number} params.lng The longitude position of the user
 * @param {string} params.q The restaurant name used to filter the list
 * @return {any[]} - The list contents, whether or not there are more items,
 * and function to load more items. [contents, hasNext, loadMoreRestaurants]
 */
export const useRestaurantList = params => {
  const { lat, lng, q } = params;
  const limit = 15;

  const [contents, setContents] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [offset, setOffset] = useState(0);

  const [data, isLoading] = useFetchRestaurants({ lat, lng, offset, limit, q });

  useEffect(() => {
    setOffset(0);
    setContents([]);
  }, [lat, lng, q]);

  useEffect(() => {
    if (data) {
      setContents(contents => contents.concat(data.contents));
      setHasNext(data.hasNext);
    }
  }, [data]);

  const loadMoreRestaurants = useCallback(() => {
    if (!isLoading && hasNext) {
      setOffset(offset + 1);
    }
  }, [offset, isLoading, hasNext]);

  return [contents, hasNext, loadMoreRestaurants];
};

/**
 * Wrapper on top of useFetchServer, used to get paginated restaurants.
 *
 * @param {Object} params The parameters used in fetching
 * @param {number} params.lat The latitude position of the user
 * @param {number} params.lng The longitude position of the user
 * @param {number} [params.offset] The list offset
 * @param {number} [params.limit] The number of restaurants per fetch
 * @param {string} [params.q] The restaurant name used to filter the result
 * @return {any[]} - the data from fetching and loading indicator. [data, isLoading]
 */
export const useFetchRestaurants = params => {
  const reqParams = useMemo(() => {
    const qs = {
      lat: params.lat,
      lng: params.lng,
    };
    if (params.offset) {
      qs.offset = params.offset;
    }
    if (params.limit) {
      qs.limit = params.limit;
    }
    if (params.q) {
      qs.q = params.q;
    }

    return { method: 'GET', qs };
  }, [params.lat, params.lng, params.offset, params.limit, params.q]);

  return useFetchServer('/restaurants', reqParams);
};

/**
 * Wrapper on top of useFetchServer, used to get info of a restaurant.
 *
 * @param {number} id The restaurant's id
 * @return {Object} - The info of the restaurant
 */
export const useFetchRestaurant = id => {
  const reqParams = { method: 'GET' };
  return useFetchServer(`/restaurants/${id}`, reqParams);
};
