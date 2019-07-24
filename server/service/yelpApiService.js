const fetch = require('node-fetch');
const queryString = require('querystring');
const yelpKey = process.env.YELP_API_KEY;
const bearer = 'Bearer ' + yelpKey;
const urlBusiness = 'https://api.yelp.com/v3/businesses'

 /**
 * Get place of a given restaurant id
 * @param {object} params
 * @param {string} params.term
 * @param {number} params.longitude
 * @param {number} params.latitude
 * @return {Promise<String>} - yelp id of place
 */

exports.getPlaceId = async (params) => {
    let idQuery = {
        term: params.term,
        longitude: params.longitude,
        latitude: params.latitude,
    };
    let urlId = urlBusiness +"/search?"+ queryString.stringify(idQuery);
    let res = await fetch(urlId,{
        'method' : 'GET',
        'headers' : {
            'Authorization' : bearer,
        },
    }); 
    let json = await res.json();
    try{
        if(json.businesses[0]){
            return json.businesses[0].id;
        }
    }catch(e){
        const message = `yelpApiService.js: error in getId\n${e}`;
        console.log(message);
        throw new Error(message);
    }
};

/**
 * Get reviews of a given restaurant id
 *
 * @param {number} id - id should be the actual yelp_id as it queries yelps api
 * @return {Promise<Object>} - reviews from yelp
 */
exports.getReviews = async (id) => {
    let urlReviews = urlBusiness + '/' + id + '/reviews';
    let res = await fetch(urlReviews,{
        'method' : 'GET',
        'headers' : {
            'Authorization' : bearer,
        },
    });
    if(res.ok){
    let json = await res.json();
    return exports.mapReviewShape(json);
    } else{
        const message = `yelpApiService.js: error in getReviews\n${e}`;
        throw new Error(message);
    }
};

/**
 * Get Details of a given restaurant id
 *
 * @param {number} id - id should be the actual yelp_id as it queries yelps api
 * @return {Promise<Object>} - Details from yelp
 */
exports.getDetails = async (id) =>{
    let urlDetails = urlBusiness + '/' + id;
    let res = await fetch(urlDetails,{
        'method' : 'GET',
        'headers' : {
            'Authorization' : bearer,
        },
    });
    if(res.ok){
    let json = await res.json();
    return json;
    } else {
        const message = `yelpApiService.js: error in getDetails\n${e}`;
        console.log(message);
        throw new Error(message);
    }
};


/**
 * Transform Review Object into similar shape as google reviews object
 *
 * @param {object} old - id should be the actual yelp_id as it queries yelps api
 * @return {object} - New shape of object
 */

 exports.mapReviewShape = (old) =>{
newShape= [];
    for(let i=0; old.reviews[i]; i+=1){
        temp = {
            "author_name" : old.reviews[i].user.name,
            "text" : old.reviews[i].text,
            "rating" : old.reviews[i].rating,
            "time": old.reviews[i].time_created,
            };
        newShape.push(temp);
    }
return newShape;
 };