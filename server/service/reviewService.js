const restaurantService = require('./restaurantService');
const googlePlacesApiService = require('./googlePlacesApiService');
const yelpApiService = require('./yelpApiService');

/**
 * Get reviews of a given restaurant id
 *
 * @param {number} id
 * @return {Promise<Object>} - reviews
 */
exports.getReviews = async id => {
  try {
    const res = {};

    const placeId = await Promise.all([
      restaurantService.getGooglePlacesId(id),
      restaurantService.getYelpId(id),
    ]);

    const reviews = await Promise.all(
      placeId.map((id, idx) => {
        if (id) {
          switch (idx) {
            case 0:
              return googlePlacesApiService.getReviews({
                placeId: placeId[0],
                language: 'en',
              });
            case 1:
              return yelpApiService.getReviews(placeId[1]);
            default:
              break;
          }
        }
      })
    );

    reviews.forEach((r, idx) => {
      if (r) {
        switch (idx) {
          case 0:
            res['google'] = r;
            break;
          case 1:
            res['yelp'] = r;
            break;
          default:
            break;
        }
      }
    });

    return res;
  } catch (e) {
    const message = `reviewService.js: error in getReviews\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};
