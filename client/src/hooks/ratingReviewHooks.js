import { useFetchServer } from './apiHooks';

/**
 * Wrapper on top of useFetchServer, used to get ratings and reviews of a restaurant.
 *
 * @param {number} id The restaurant's id
 * @return {any[]} - The ratings and the reviews of the restaurant, and a loading indicator
 * in that order. [ratings, reviews, isLoading]
 */
export const useFetchRatingReviews = id => {
  const reqParams = { method: 'GET' };
  const [data, isLoading] = useFetchServer(
    `/restaurants/${id}/rating-reviews`,
    reqParams
  );

  const reviews = {};
  const ratings = {};
  if (data) {
    Object.entries(data).forEach(entry => {
      const source = entry[0];
      const content = entry[1];
      ratings[source] = content.rating;
      reviews[source] = content.reviews;
    });
  }

  if (!reviews.google) {
    reviews.google = [];
  }

  if (!reviews.yelp) {
    reviews.yelp = [];
  }

  return [ratings, reviews, isLoading];
};
