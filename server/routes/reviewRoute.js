const express = require('express');
const router = express.Router();
const { getReviews } = require('../controllers/reviewController');

router.get('/:id', getReviews);

module.exports = router;
