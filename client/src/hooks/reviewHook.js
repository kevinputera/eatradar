import { useState } from 'react';
import { useFetchServer } from './apiHooks';

/**
 * Custom hook to get reviews of a restaurant and manage their focus.
 *
 * @param {number} id The restaurant's id
 * @return {Object} - The reviews of the restaurant, the selected review,
 * and function to handle selection change. [reviews, reviewSelected, setReviewSelected]
 */
export const useReviews = id => {
  const [reviews, isReviewsLoading] = useFetchReviews(id);
  const [reviewSelected, setReviewSelected] = useState(null);
  return [reviews, reviewSelected, setReviewSelected, isReviewsLoading];
};

/**
 * Wrapper on top of useFetchServer, used to get reviews of a restaurant.
 *
 * @param {number} id The restaurant's id
 * @return {Object} - The reviews of the restaurant
 */
export const useFetchReviews = id => {
  const reqParams = { method: 'GET' };
  return useFetchServer(`/reviews/${id}`, reqParams);
};
