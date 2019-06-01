const express = require('express');
const router = express.Router();
//Testing for Members POJO, delete later
const reviews = require('../../Reviews');

//Get all reviews
router.get('/', (req,res) =>{
    //TODO add in how we want to access api from elsewhere
    res.json(reviews);
});

//Get Single Review based on id
router.get('/:id', (req, res) =>{
    res.json(reviews.filter(review => review.id === parseInt(req.params.id)));

});

module.exports =  router;
