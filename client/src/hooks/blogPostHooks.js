import { useFetchServer } from './apiHooks';

/**
 * Wrapper on top of useFetchServer, used to get blog posts of a restaurant.
 *
 * @param {number} id The restaurant's id
 * @return {Object[]} - The blog posts of the restaurant
 */
export const useFetchBlogPosts = id => {
  const reqParams = { method: 'GET' };
  const [data, isLoading] = useFetchServer(
    `/restaurants/${id}/blog-posts`,
    reqParams
  );
  if (data) {
    const blogPosts = data.map(bp => ({
      id: bp._id,
      ...bp._source,
    }));
    return [blogPosts, isLoading];
  }
  return [[], isLoading];
};
