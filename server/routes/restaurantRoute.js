const express = require('express');
const router = express.Router();

const { getBlogPosts } = require('../controllers/blogPostController');
const { getDetails } = require('../controllers/detailController');
const { getRatingReviews } = require('../controllers/ratingReviewController');
const {
  getRestaurants,
  getRestaurant,
} = require('../controllers/restaurantController');

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.get('/:id/details', getDetails);
router.get('/:id/blog-posts', getBlogPosts);
router.get('/:id/rating-reviews', getRatingReviews);

module.exports = router;
