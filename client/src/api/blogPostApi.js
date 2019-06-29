import Immutable from 'immutable';
import { get } from '../utils/http';
import { blogPost } from '../entity/blogPost';

/**
 * Get all blog posts of a restaurant
 *
 * @param {Object} params
 * @param {number} params.id
 * @param {number} [params.page]
 * @param {number} [params.pageSize]
 * @return {Immutable.List<Immutable.Record>} - a list of blog posts
 */
export const getRestaurants = async params => {
  try {
    const json = await get(`/blogposts/${params.id}`, params);
    return Immutable.List(json.data.map(bp => blogPost(bp._source)));
  } catch (e) {
    return Immutable.List();
  }
};
