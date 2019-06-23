const express = require('express');
const reviewService = require('../service/reviewService');
const router = express.Router();
const response = require('../utils/response');

router.get('/', async(req, res) =>{
    let id = req.query.id;
    if(!id || id < 0){
      response.sendBadRequest(res, 'A correct id must be appended to the URI as request parameters');
      return;
    }
    try {
        const result = await reviewService.getReviews(id);
        response.sendOk(res, result);
      } catch (e) {
        response.sendInternalError(res, e.message);
    }    
});

module.exports =  router;
