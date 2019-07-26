const express = require('express');
const router = express.Router();
const { getDetails } = require('../controllers/detailController');

router.get('/:id', getDetails);

module.exports = router;
