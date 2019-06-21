const express = require('express');
const reviewService = require('../service/reviewService');
const router = express.Router();


// TODO: create route for review requests
router.get('/', async(req, res) =>{
    let id = req.query.id;
    if(!id || id < 0){
      res.status(400).send(
        'A correct id must be appended to the URI as request parameters'
      );
      return;
    }
    try {
        const result = await reviewService.getReviews(id);
        res.status(200).json(result);
      } catch (e) {
        res.status(500).send(e.message);
    }    
});

module.exports =  router;
