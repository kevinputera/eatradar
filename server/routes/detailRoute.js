const express = require('express');
const router = express.Router();
const detailService = require('../service/detailService');
const response = require('../utils/response');


// TODO: create route for detail requests
router.get('/', async(req,res) => {
    let id = req.query.id;
    if(!id || id < 0){
      response.sendBadRequest(res, 'A correct id must be appended to the URI as request parameters');
      return;
      }
    try {
        const result = await detailService.getDetails(id);
        response.sendOk(res, result);
      } catch (e) {
        response.sendBadRequest(res, e.message);
    }    
});

module.exports = router