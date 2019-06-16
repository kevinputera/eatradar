const express = require('express');
const reviewService = require('../service/reviewService');
const router = express.Router();


// TODO: create route for review requests
router.get('/', async(req, res) =>{
    let id = req.query.id;
    try {
        const result = await reviewService.getReviews(id);
        res.status(200).json(result);
      } catch (e) {
        res.status(500).send(e.message);
    }    
});

module.exports =  router;
