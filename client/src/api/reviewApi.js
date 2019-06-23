import Immutable from 'immutable';
import { get } from '../utils/http';
import { review, reviews } from './reviews';

/**
 * Get the ratings and reviews of a restaurant
 * 
 * @param {number} id
 * @return {Immutable.Record} - ratings and reviews of a restaurant
 */
export const getReviews = async id => {
  try {
    const json = await get(`/reviews/${id}`);
    const raw = json.data.google;

    let revs;
    if (raw.reviews) {
      revs = Immutable.List(raw.reviews.map(r => review(r)));
    }

    return reviews({
      rating: raw.rating,
      reviews: revs,
    });
  } catch (e) {
    return reviews();
  }
};