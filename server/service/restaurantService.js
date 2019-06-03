const { pool } = require("../db");

const funcs = {
  // Get restaurants closest to longitude, latitude
  getRestaurants: async (longitude, latitude, page = 1, pageSize = 10) => {
    const geog = `Point(${longitude} ${latitude})`;
    const query = {
      text: `
        SELECT restaurant.id AS id, 
            restaurant.name AS name,
            street.name AS street, 
            restaurant.postcode AS postcode,
            ST_X(restaurant.location::geometry) AS lon,
            ST_Y(restaurant.location::geometry) AS lat,
            ST_Distance(restaurant.location, $1) AS dist
        FROM restaurant
        INNER JOIN street
        ON restaurant.street_id = street.id
        ORDER BY restaurant.location <-> $1 ASC
        OFFSET $2
        LIMIT $3
      `,
      values: [geog, (page - 1) * pageSize, pageSize]
    }
    
    const client = await pool.connect();
    try {
      const res = await client.query(query);
      return res.rows;
    } catch (e) {
      console.log(`restaurantService.js: error in getRestaurants: ${e}`);
      throw new Error(`restaurantService.js: failed to retrieve restaurants: ${e}`);
    } finally {
      client.release();
    }
  }

}

module.exports = funcs;