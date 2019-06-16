const restaurantService = require('./service/restaurantService')
const googlePlacesApiService = require('./service/googlePlacesApiService')
const reviewService = require('./service/reviewService')
const detailService = require('./service/detailService')

//restaurantService.getClosestRestaurants({longitude: 0, latitude: 0, page: 1, pageSize:10}).then(console.log);

detailService.getDetails(1)
  .then(console.log);