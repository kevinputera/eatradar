const { esClient } = require('../config/elasticsearchConfig');
const restaurantService = require('./restaurantService');

/**
 * Get all blog posts for a restaurant
 *
 * @param {number} id
 * @return {Promise<Object>}
 */
exports.getAllBlogPosts = async id => {
  const restaurant = await restaurantService.getRestaurant(id).name;
  const res = await esClient.search({
    index: 'blogpost',
    body: {
      query: {
        match: {
          post: {
            query: restaurant,
            fuzziness: 1,
          },
        },
      },
    },
  });

  console.log(res);
};
