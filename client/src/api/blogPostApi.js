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
export const getBlogPosts = async params => {
  const reqParams = {};
  if (params.page) {
    reqParams.p = params.page;
  }
  if (params.pageSize) {
    reqParams.ps = params.pageSize;
  }

  try {
    const json = await get(`/blogposts/${params.id}`, reqParams);
    console.log(json);
    return Immutable.List(
      json.data.map(bp => blogPost({ id: bp._id, ...bp._source }))
    );
  } catch (e) {
    return Immutable.List();
  }
};

/**
 * Get the number of blog posts of a restaurant
 *
 * @param {number} id
 * @return {number} - the number of blog posts, -1 if not found
 */
export const getBlogPostsCount = async id => {
  try {
    const json = await get(`/blogposts/${id}/count`);
    return json.data.count;
  } catch (e) {
    return 0;
  }
};
