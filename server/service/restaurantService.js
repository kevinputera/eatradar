const { pgPool } = require("../config/dbConfig");
const googlePlacesApiService = require('./googlePlacesApiService');

// TODO: Get all restaurants, useful for map
exports.getAllRestaurants = async () => {}

/** 
 * Get list of restaurants closest to longitude, latitude
 * 
 * @param {Object} params
 * @param {number} params.longitude
 * @param {number} params.latitude 
 * @param {number} params.page
 * @param {number} params.pageSize
 * @param {string} params.q
 * @return {Promise<Object[]>} - list of restaurants
 */
exports.getClosestRestaurants =  async (params) => {
  const geog = `Point(${params.longitude} ${params.latitude})`;
  const pgClient = await pgPool.connect();

  let q;
  if (params.q) {
    const query = {
      text: /* sql */`
        SELECT word
        FROM lexeme
        WHERE similarity(word, $1) > 0.3
        ORDER BY word <-> $1
        LIMIT 1;
      `,
      values: [params.q]
    }

    try {
      const res = await pgClient.query(query);
      if (res.rows[0]) {
        console.log(res.rows[0]);
        q = res.rows[0].word;
      }
    } catch (e) {
      const message = `restaurantService.js: error in getClosestRestaurant\n${e}`;
      console.log(message);
      q = null;
    }
  }
  
  let values = [geog, (params.page - 1) * params.pageSize, params.pageSize];
  if (q) {
    values.push(q);
  }
  const query = {
    text: /* sql */`
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
      ${q ? /* sql */`WHERE to_tsvector('simple', restaurant.name) @@ to_tsquery('simple', $4)` : ''}
      ORDER BY restaurant.location <-> $1 ASC
      OFFSET $2
      LIMIT $3;
    `,
    values: values
  };
  
  try {
    const res = await pgClient.query(query);
    return res.rows;
  } catch (e) {
    const message = `restaurantService.js: error in getClosestRestaurants\n${e}`;
    console.log(message);
    throw new Error(message)
  } finally {
    await pgClient.release();
  }
}

/**
 * Get a restaurant details from its id
 * 
 * @param {number} id
 * @return {Promise<Object>} - restaurant details
 */
exports.getRestaurant = async (id) => {
  const query = {
    text: /* sql */`
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
    values: [id]
  } 

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
}

/**
 * Get the google place id for a given restaurant id
 * 
 * @param {number} id
 * @return {Promise<string>} - google_places_id
 */
exports.getGooglePlacesId = async (id) => {
  const query = {
    text: /* sql */`
      SELECT restaurant.google_places_id
      FROM restaurant
      WHERE id = $1; 
    `,
    values: [id]
  }

  const pgClient = await pgPool.connect();
  try {
    const res = await pgClient.query(query);
    return this.processGooglePlacesId(id, res.rows[0].google_places_id);
  } catch (e) {
    const message = `restaurantService.js: error in getGooglePlacesId\n${e}`;
    console.log(message);
    throw new Error(message);
  }
}

/**
 * Update google places id for a given restaurant id
 * 
 * @param {number} id
 * @param {string} googlePlacesId
 * @return {Promise<number>} - id
 */
exports.updateGooglePlacesId = async (id, googlePlacesId) => {
  const query = {
    text: /* sql */`
      UPDATE restaurant
      SET google_places_id = $2
      WHERE id = $1;
    `,
    values: [id, googlePlacesId]
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
}

/**
 * Process a restaurant's google places id
 * Make a getPlaceId call through googlePlacesApiService if necessary
 * Make a refreshPlaceId call through googlePlacesApiService if necessary
 * 
 * @param {number} id
 * @param {string} googlePlacesId
 * @return {Optional<string>} - places id
 */
exports.processGooglePlacesId = async (id, googlePlacesId) => {
  // TODO: refresh google places id if too old
  if (googlePlacesId === null) {
    try {
      const detail = await this.getRestaurant(id);
      const retrievedPlaceId = await googlePlacesApiService.getPlaceId({
        input: detail.name,
        latitude: detail.lat,
        longitude: detail.lng,
        language: 'en' 
      });

      await this.updateGooglePlacesId(id, retrievedPlaceId);
      return retrievedPlaceId;
    } catch (e) {
      const message = `restaurantService.js: error in processGooglePlacesId\n${e}`;
      console.log(message);
      throw new Error(e);
    }
  }

  return googlePlacesId;
}
