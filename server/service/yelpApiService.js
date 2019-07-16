// TODO: Add yelp integeration
const yelp_key = process.env.YELP_API_KEY;
const bearer = 'Bearer ' + yelp_key;
const url = 'https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972';
var urlBusiness = 'https://api.yelp.com/v3/businesses'
const fetch = require('node-fetch');
var querystring = require('querystring');
const restaurants = require('../service/restaurantService');

exports.testYelp = async () => {
   return await fetch(url,{
        'method' : 'GET',
        'headers' : {
            'Authorization' : bearer,
        },
    }).then(response => response.json())
    .then(json =>{
        console.log(json);
        return json;
    });
};

 /**
 * Get reviews of a given restaurant id
 * @param {object} params
 * @param {string} params.term
 * @param {number} params.longitude
 * @param {number} params.latitude
 * @return {Promise<String>} - yelp id of place
 */

exports.getPlaceId = async (params) => {
    var id_query = {
        term: params.term,
        longitude: params.longitude,
        latitude: params.latitude,
    };
    var urlId = urlBusiness +"/search?"+ querystring.stringify(id_query);
    return await fetch(urlId,{
        'method' : 'GET',
        'headers' : {
            'Authorization' : bearer,
        },
    }).then(response => response.json())
    .then(json =>{
        if(json.businesses[0]){
        return json.businesses[0].id;
        }
    });    
};

/**
 * Get reviews of a given restaurant id
 *
 * @param {number} id - id should be the actual yelp_id as it queries yelps api
 * @return {Promise<Object>} - reviews from yelp
 */
exports.getReviews = async (id) => {
    var urlReviews = urlBusiness + '/' + id + '/reviews';
    return await fetch(urlReviews,{
        'method' : 'GET',
        'headers' : {
            'Authorization' : bearer,
        },
    }).then(response => response.json())
    .then(json =>{
        return json;
    });    
};

/**
 * Get reviews of a given restaurant id
 *
 * @param {number} id - id should be the actual yelp_id as it queries yelps api
 * @return {Promise<Object>} - reviews from yelp
 */
exports.getDetails = async (id) =>{
    var urlDetails = urlBusiness + '/' + id;
    return await fetch(urlDetails,{
        'method' : 'GET',
        'headers' : {
            'Authorization' : bearer,
        },
    }).then(response => response.json())
    .then(json =>{
        return json;
    }); 
};

