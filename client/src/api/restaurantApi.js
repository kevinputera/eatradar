import Immutable from 'immutable';
import { get } from '../utils/http';
import { restaurant } from '../entity/restaurant';

/**
 * Get restaurants, filter by params
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
    const json = await get(`${process.env.REACT_APP_SERVER_URL}/restaurants`, {
      qs: params,
    });
    return Immutable.List(json.data.map(r => restaurant(r)));
  } catch (e) {
    return Immutable.List();
  }
};

export const getRestaurant = async id => {
  try {
    const json = await get(
      `${process.env.REACT_APP_SERVER_URL}/restaurants/${id}`
    );
    return restaurant(json.data);
  } catch (e) {
    return restaurant();
  }
};
