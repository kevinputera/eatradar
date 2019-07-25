import { useFetchServer } from './apiHooks';

/**
 * Custom hook to get ratings and reviews of a restaurant.
 *
 * @param {number} id The restaurant's id
 * @return {any[]} - The ratings of the restaurant, reviews of the restaurant,
 * and a loading indicator. [ratings, reviews, isLoading]
 */
export const useReviews = id => {
  const [ratings, reviews, isLoading] = useFetchReviews(id);
  return [ratings, reviews, isLoading];
};

/**
 * Wrapper on top of useFetchServer, used to get reviews of a restaurant.
 *
 * @param {number} id The restaurant's id
 * @return {any[]} - The ratings and reviews of the restaurant, in that order.
 * [ratings, reviews]
 */
export const useFetchReviews = id => {
  const reqParams = { method: 'GET' };
  const [data, isLoading] = useFetchServer(`/reviews/${id}`, reqParams);

  const reviews = {};
  const ratings = {};
  if (data) {
    Object.entries(data).forEach(entry => {
      const brand = entry[0];
      const content = entry[1];
      ratings[brand] = content.rating;
      reviews[brand] = content.reviews;
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
