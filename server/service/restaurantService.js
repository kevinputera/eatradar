const { pgPool } = require('../config/dbConfig');
const { esClient } = require('../config/elasticsearchConfig');
const googlePlacesApiService = require('./googlePlacesApiService');
const yelpApiService = require('./yelpApiService');

/**
 * Get a list of all restaurant ids and locations in GeoJSON format, filtered by name
 *
 * @param {string} [q] The name filter
 * @return {Promise<Object>} - list of restaurant ids and locations in GeoJSON format
 */
exports.getRestaurantLocationsGeoJSON = async q => {
  try {
    const res = await exports.getRestaurantNamesAndLocations(q);
    return {
      type: 'FeatureCollection',
      features: res
        .map(r => r._source)
        .map(r => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [r.lng, r.lat],
          },
          properties: {
            id: r.id,
          },
        })),
    };
  } catch (e) {
    const message = `restaurantService.js: error in getRestaurantLocationsGeoJSON\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};

/**
 * Get a list of all restaurant ids, names and locations, filtered by name
 *
 * @param {string} [q] The name filter
 * @return {Promise<Object[]>} - list of restaurant ids, names and locations
 */
exports.getRestaurantNamesAndLocations = async q => {
  try {
    let body;
    if (q) {
      body = {
        min_score: 9,
        query: {
          multi_match: {
            query: q,
            fuzziness: 2,
            fields: ['name^2', 'street'],
          },
        },
      };
    } else {
      body = {
        query: {
          match_all: {},
        },
      };
    }
    const res = await esClient.search({
      index: 'restaurant',
      body: body,
      size: 40000,
    });
    return res.body.hits.hits;
  } catch (e) {
    const message = `restaurantService.js: error in getRestaurantNamesAndLocations\n${e}`;
    console.log(message);
    throw new Error(message);
  }
};

/**
 * Get restaurants with filters applied.
 *
 * @param {Object} params
 * @param {number} params.longitude
 * @param {number} params.latitude
 * @param {number} params.offset
 * @param {number} params.limit
 * @param {string} [params.q]
 * @return {Promise<Object>} - total number and list of restaurants
 */
exports.getRestaurants = async params => {
  const geog = `Point(${params.longitude} ${params.latitude})`;
  const pgClient = await pgPool.connect();

  let ids;
  let filter;
  let values = [geog, params.offset * params.limit, params.limit];

  try {
    ids = await exports.getRestaurantNamesAndLocations(params.q);
    if (ids.length) {
      filter = /* sql */ `WHERE restaurant.id IN (${ids
        .map((_, idx) => '$' + (idx + values.length + 1))
        .join(',')})`;
      values = [...values, ...ids.map(i => i._source.id)];
    }
  } catch (e) {
    pgClient.release();
    const message = `restaurantService.js: error in getRestaurants\n${e}`;
    console.log(message);
    throw new Error(message);
  }

  const query = {
    text: /* sql */ `
      SELECT restaurant.id AS id, 
          restaurant.name AS name,
          restaurant.block AS block,
          street.name AS street, 
          restaurant.unit AS unit,
          restaurant.level AS level,
          restaurant.postcode AS postcode,
          ST_Distance(restaurant.location, $1) AS dist
      FROM restaurant
      INNER JOIN street
          ON restaurant.street_id = street.id
      ${filter || ''}
      ORDER BY restaurant.location <-> $1 ASC
      OFFSET $2
      LIMIT $3;
    `,
    values: values,
  };

  try {
    const res = await pgClient.query(query);
    return {
      hasNext: (params.offset + 1) * params.limit < ids.length,
      contents: res.rows,
    };
  } catch (e) {
    const message = `restaurantService.js: error in getRestaurants\n${e}`;
    console.log(message);
    throw new Error(message);
  } finally {
    await pgClient.release();
  }
};

/**
 * Get a restaurant details from its id
 *
 * @param {number} id
 * @return {Promise<Object>} - restaurant details
 */
exports.getRestaurant = async id => {
  const query = {
    text: /* sql */ `
      SELECT restaurant.id AS id, 
          restaurant.name AS name,
          restaurant.block AS block,
          street.name AS street, 
          restaurant.unit AS unit,
          restaurant.level AS level,
          restaurant.postcode AS postcode,
          ST_X(restaurant.location::geometry) AS lng,
          ST_Y(restaurant.location::geometry) AS lat
      FROM restaurant
      INNER JOIN street
          ON restaurant.street_id = street.id
      WHERE restaurant.id = $1;
    `,
    values: [id],
  };

  const pgClient = await pgPool.connect();
  try {
    const res = await pgClient.query(query);
    return res.rows[0];
  } catch (e) {
    const message = `restaurantService.js: error in getRestaurant\n${e}`;
    console.log(message);
    throw new Error(message);
  } finally {
    await pgClient.release();
  }
};

/**
 * Get the google place id for a given restaurant id
 *
 * @param {number} id
 * @return {Promise<string>} - google_places_id
 */
exports.getGooglePlacesId = async id => {
  const query = {
    text: /* sql */ `
      SELECT restaurant.google_places_id
      FROM restaurant
      WHERE id = $1; 
    `,
    values: [id],
  };

  const pgClient = await pgPool.connect();
  try {
    const res = await pgClient.query(query);
    return exports.processGooglePlacesId(id, res.rows[0].google_places_id);
  } catch (e) {
    const message = `restaurantService.js: error in getGooglePlacesId\n${e}`;
    console.log(message);
    throw new Error(message);
  } finally {
    await pgClient.release();
  }
};

/**
 * Update google places id for a given restaurant id
 *
 * @param {number} id
 * @param {string} googlePlacesId
 * @return {Promise<number>} - id
 */
exports.updateGooglePlacesId = async (id, googlePlacesId) => {
  const query = {
    text: /* sql */ `
      UPDATE restaurant
      SET google_places_id = $2
      WHERE id = $1;
    `,
    values: [id, googlePlacesId],
  };

  const pgClient = await pgPool.connect();
  try {
    await pgClient.query(query);
    return id;
  } catch (e) {
    const message = `restaurantService.js: error in updateGooglePlacesId\n${e}`;
    console.log(message);
    throw new Error(message);
  } finally {
    await pgClient.release();
  }
};

/**
 * Process a restaurant's google places id
 * Make a getPlaceId call through googlePlacesApiService if necessary
 * Make a refreshPlaceId call through googlePlacesApiService if necessary
 *
 * @param {number} id
 * @param {string} googlePlacesId
 * @return {string} - places id
 */
exports.processGooglePlacesId = async (id, googlePlacesId) => {
  // TODO: refresh google places id if too old
  if (!googlePlacesId) {
    try {
      const detail = await exports.getRestaurant(id);
      const retrievedPlaceId = await googlePlacesApiService.getPlaceId({
        input: detail.name,
        latitude: detail.lat,
        longitude: detail.lng,
        language: 'en',
      });

      await exports.updateGooglePlacesId(id, retrievedPlaceId);
      return retrievedPlaceId;
    } catch (e) {
      const message = `restaurantService.js: error in processGooglePlacesId\n${e}`;
      console.log(message);
      throw new Error(e);
    }
  }

  return googlePlacesId;
};

/**
 * Update yelp id for a given restaurant id
 *
 * @param {number} id
 * @param {string} yelpId
 * @return {Promise<number>} - id
 */
exports.updateYelpId = async (id, yelpId) => {
  const query = {
    text: /* sql */ `
      UPDATE restaurant
      SET yelp_id = $2
      WHERE id = $1;
    `,
    values: [id, yelpId],
  };

  const pgClient = await pgPool.connect();
  try {
    await pgClient.query(query);
    return id;
  } catch (e) {
    const message = `restaurantService.js: error in updateYelpId\n${e}`;
    console.log(message);
    throw new Error(message);
  } finally {
    await pgClient.release();
  }
};

/**
 * Process a restaurant's Yelp id
 * Make a getPlaceId call through Yelp Api Services if necessary
 * Make a refreshPlaceId call through Yelp Api Services if necessary
 * retrieved place id is the id received from calling the Yelp Api
 *
 * @param {number} id
 * @param {string} yelpId
 * @return {string} - yelp id
 */
exports.processYelpId = async (id, yelpId) => {
  if (!yelpId) {
    try {
      const detail = await exports.getRestaurant(id);
      const retrievedPlaceId = await yelpApiService.getPlaceId({
        term: detail.name,
        latitude: detail.lat,
        longitude: detail.lng,
      });
      if (retrievedPlaceId) {
        await exports.updateYelpId(id, retrievedPlaceId);
        return retrievedPlaceId;
      }
    } catch (e) {
      const message = `restaurantService.js: error in processYelpId\n${e}`;
      console.log(message);
      throw new Error(e);
    }
  }

  return yelpId;
};

/**
 * Get the yelp id for a given restaurant id
 *
 * @param {number} id
 * @return {Promise<string>} - yelp_id
 */
exports.getYelpId = async id => {
  const query = {
    text: /* sql */ `
      SELECT restaurant.yelp_id
      FROM restaurant
      WHERE id = $1; 
    `,
    values: [id],
  };

  const pgClient = await pgPool.connect();
  try {
    const res = await pgClient.query(query);
    return exports.processYelpId(id, res.rows[0].yelp_id);
  } catch (e) {
    const message = `restaurantService.js: error in getYelpPlacesId\n${e}`;
    console.log(message);
    throw new Error(message);
  } finally {
    await pgClient.release();
  }
};
