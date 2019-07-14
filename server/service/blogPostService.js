const { esClient } = require('../config/elasticsearchConfig');
const restaurantService = require('./restaurantService');

/**
 * Get all blog posts for a restaurant
 *
 * @param {number} id
 * @return {Promise<Object[]>}
 */
exports.getBlogPosts = async id => {
  const limit = 5;
  const restaurant = await restaurantService.getRestaurant(id);
  const res = await esClient.search({
    index: 'blogpost',
    body: {
      min_score: 1,
      query: {
        multi_match: {
          query: restaurant.name,
          fuzziness: 1,
          fields: ['title^2', 'post'],
        },
      },
    },
    size: limit,
  });
  return res.body.hits.hits;
};
