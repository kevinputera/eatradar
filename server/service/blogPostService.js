const { esClient } = require('../config/elasticsearchConfig');
const restaurantService = require('./restaurantService');

const {
  BLOG_POST_LIMIT,
  BLOG_POST_ES_MIN_SCORE,
  BLOG_POST_ES_FUZZINESS,
  BLOG_POST_ES_INDEX_NAME,
} = require('../constants/blogPostConstants');

/**
 * Get all blog posts for a restaurant
 *
 * @param {number} id
 * @return {Promise<Object[]>}
 */
exports.getBlogPosts = async id => {
  const restaurant = await restaurantService.getRestaurant(id);
  const res = await esClient.search({
    index: BLOG_POST_ES_INDEX_NAME,
    size: BLOG_POST_LIMIT,
    body: {
      min_score: BLOG_POST_ES_MIN_SCORE,
      query: {
        multi_match: {
          query: restaurant.name,
          fuzziness: BLOG_POST_ES_FUZZINESS,
          fields: ['title^2', 'post'],
        },
      },
    },
  });
  return res.body.hits.hits;
};
