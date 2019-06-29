const express = require('express');
const router = express.Router();
const blogPostService = require('../service/blogPostService');
const response = require('../utils/response');

/**
 * Get all blog posts of a restaurant based on id.
 */
router.get('/:id', async (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id);
  } catch (e) {
    response.sendBadRequest(res, 'Id must be of type number');
    return;
  }

  const params = {
    id,
    page: req.query.p || 1,
    pageSize: req.query.ps || 5,
  };

  if (!params.id || params.id < 0) {
    response.sendBadRequest(
      res,
      'A correct id must be included in the request URI'
    );
    return;
  }

  if (params.page <= 0) {
    response.sendBadRequest(
      res,
      'Page query parameter[p] must be greater than zero'
    );
    return;
  }

  if (params.pageSize < 5) {
    response.sendBadRequest(res, 'Page size must be greater than 5');
    return;
  }

  try {
    const result = await blogPostService.getBlogPosts(params);
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
});

/**
 * Get the number of blog posts for a restaurant id
 */
router.get('/:id/count', async (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id);
  } catch (e) {
    response.sendBadRequest(res, 'Id must be of type number');
    return;
  }

  if (!id || id < 0) {
    response.sendBadRequest(
      res,
      'A correct id must be included in the request URI'
    );
    return;
  } 

  try {
    const result = await blogPostService.getBlogPostsCount(id);
    response.sendOk(res, { count: result });
  } catch (e) {
    response.sendInternalError(res, e.message);
  } 
});

module.exports = router;
