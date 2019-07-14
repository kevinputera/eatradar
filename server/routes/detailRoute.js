const express = require('express');
const router = express.Router();
const detailService = require('../service/detailService');
const response = require('../utils/response');

/**
 * Get restaurant details based on id.
 */
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    response.sendBadRequest(res, 'Id must be of type number');
    return;
  }

  if (id < 0) {
    response.sendBadRequest(
      res,
      'A correct id must be included in the request URI'
    );
    return;
  }

  try {
    const result = await detailService.getDetails(id);
    response.sendOk(res, result);
  } catch (e) {
    response.sendInternalError(res, e.message);
  }
});

module.exports = router;
