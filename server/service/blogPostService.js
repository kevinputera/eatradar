const { esClient } = require('../config/elasticsearchConfig');
const restaurantService = require('./restaurantService');

/**
 * Get all blog posts for a restaurant
 *
 * @param {Object} params
 * @param {number} params.id
 * @param {number} params.page
 * @param {number} params.pageSize
 * @return {Promise<Object>}
 */
exports.getBlogPosts = async params => {
  const restaurant = await restaurantService.getRestaurant(params.id);
  const res = await esClient.search({
    index: 'blogpost',
    body: {
      query: {
        multi_match: {
          query: restaurant.name,
          fuzziness: 1,
          fields: ['title^2', 'post'],
        },
      },
    },
    from: params.page - 1,
    size: params.pageSize,
  });
  return res.body.hits.hits;
};

/**
 * Get the number of blog posts blog posts of a restaurant
 *
 * @param {number} id
 * @return {Promise<number>} 
 */
exports.getBlogPostsCount = async id => {
  const restaurant = await restaurantService.getRestaurant(id);
  const res = await esClient.search({
    index: 'blogpost',
    body: {
      query: {
        multi_match: {
          query: restaurant.name,
          fuzziness: 1,
          fields: ['title^2', 'post'],
        },
      },
    },
  });
  return res.body.hits.total.value;
}
