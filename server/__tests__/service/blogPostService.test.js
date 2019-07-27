const blogPostService = require('../../service/blogPostService');
const { esClient } = require('../../config/elasticsearchConfig');
const restaurantService = require('../../service/restaurantService');

const {
  BLOG_POST_LIMIT,
  BLOG_POST_ES_MIN_SCORE,
  BLOG_POST_ES_FUZZINESS,
  BLOG_POST_ES_INDEX_NAME,
} = require('../../constants/blogPostConstants');

jest.mock('../../config/elasticsearchConfig');
jest.mock('../../service/restaurantService');

test('getBlogPosts must call elasticsearch client with correct body', async () => {
  const res = { body: { hits: { hits: ['blog post'] } } };
  const restaurant = { name: 'restaurant' };
  esClient.search.mockResolvedValue(res);
  restaurantService.getRestaurant.mockResolvedValue(restaurant);

  const id = 5;
  const query = {
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
  };
  expect(await blogPostService.getBlogPosts(id)).toEqual(res.body.hits.hits);
  expect(restaurantService.getRestaurant).toHaveBeenCalledTimes(1);
  expect(restaurantService.getRestaurant).toHaveBeenCalledWith(id);
  expect(esClient.search).toHaveBeenCalledTimes(1);
  expect(esClient.search).toHaveBeenCalledWith(query);
});
