const blogPostService = require('../service/blogPostService');
const response = require('../utils/response');

/**
 * Get all blog posts of a restaurant based on id.
 */
async function getBlogPosts(req, res) {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    response.sendBadRequest(res, 'Id must be of type number');
    return;
  }

  if (id < 0) {
    response.sendBadRequest(res, 'A correct id must be included in the request URI');
    return;
  }

  try {
    const result = await blogPostService.getBlogPosts(id);
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
}

module.exports = { getBlogPosts };
