const express = require('express');
const router = express.Router();
const { getBlogPosts } = require('../controllers/blogPostController');

router.get('/:id', getBlogPosts);

module.exports = router;
