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

  if (!id || id < 0) {
    response.sendBadRequest(
      res,
      'A correct id must be included in the request URI'
    );
    return;
  }

  try {
    const result = await blogPostService.getBlogPosts(id);
    response.sendOk(res, result);
  } catch (e) {
    response.sendBadRequest(res, e.message);
  }
});

module.exports = router;
