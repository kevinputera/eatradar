import Immutable from 'immutable';
import { get } from '../utils/http';
import { restaurant } from './restaurant';

/**
 * Get closest restaurants to a point, filter by params
 * 
 * @param {Object} params 
 * @param {number} params.lat
 * @param {number} params.lng
 * @param {number} [params.page]
 * @param {number} [params.pageSize]
 * @param {string} [params.q]
 * @return {Immutable.List<Immutable.Record>} - a list of restaurants
 */
export const getRestaurants = async params => {
  try {
    const json = await get('/restaurants', params);
    return Immutable.List(
      json.data.map(item => restaurant(item))
    );
  } catch (e) {
    return Immutable.List();
  }
};