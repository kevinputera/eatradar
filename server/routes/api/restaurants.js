const express = require('express');
const router = express.Router();
//Testing for Members POJO, delete later
const restaurants = require('../../Restaurants');

//Get all Restaurants
router.get('/', (req,res) =>{
    //TODO add in model methods to access database and paginate lists
    res.json(restaurants);
});

//Get Single Restaurant based on id
router.get('/:id', (req, res) =>{
    res.json(restaurants.filter(restaurant => restaurant.id === parseInt(req.params.id)));

});

module.exports =  router;
