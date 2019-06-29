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
  console.log(params);
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

  return {
    count: res.body.hits.total.value,
    hits: res.body.hits.hits,
  };
};
