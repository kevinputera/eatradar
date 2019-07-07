import Immutable from 'immutable';
import { get } from '../utils/http';
import { review, reviews, reviewsAgg } from '../entity/reviews';

/**
 * Get the ratings and reviews of a restaurant
 *
 * @param {number} id
 * @return {Immutable.Record} - ratings and reviews of a restaurant
 */
export const getReviews = async id => {
  try {
    const json = await get(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}`);
    const raw = json.data;

    const reviewsObj = {};
    for (let brand of Object.keys(raw)) {
      let revs;
      if (raw[brand].reviews) {
        revs = Immutable.List(raw[brand].reviews.map(r => review(r)));
      } else {
        revs = Immutable.List();
      }

      reviewsObj[brand] = reviews({
        rating: raw[brand].rating,
        reviews: revs,
      });
    }

    return reviewsAgg(reviewsObj);
  } catch (e) {
    return reviews();
  }
};
