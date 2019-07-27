const fs = require('fs');
const { pgPool } = require('../config/dbConfig');
const { esClient } = require('../config/elasticsearchConfig');
const { capitalize } = require('../utils/stringUtils');

const rjson = require('./foodEstablishmentsParsed.json');
const bjson = require('./blogposts.json');

let restaurantPks = [];

const r = (async () => {
  const pgClient = await pgPool.connect();

  // populate street table, restaurant table, and elasticsearch restaurants index with real data
  for (const entry of rjson) {
    const findStreetPkQuery = {
      text: /* sql */ `
        SELECT street.id 
        FROM street 
        WHERE name = $1;
      `,
      values: [entry.street],
    };

    let streetPk;
    try {
      const findStreetPkResult = await pgClient.query(findStreetPkQuery);

      if (findStreetPkResult.rows.length == 0) {
        const insertStreetQuery = {
          text: /* sql */ `
            INSERT INTO street(name) 
            VALUES ($1) 
            RETURNING id;
          `,
          values: [entry.street],
        };

        streetPk = (await pgClient.query(insertStreetQuery)).rows[0].id;
      } else {
        streetPk = findStreetPkResult.rows[0].id;
      }
    } catch (e) {
      console.log(`seed.js: error in checking id\n${e}`);
    }

    const insertRestaurantQuery = {
      text: /* sql */ `
        INSERT INTO restaurant(
            name, 
            block, 
            postcode, 
            unit,
            level, 
            location, 
            street_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
      `,
      values: [
        capitalize(entry.name),
        entry.block === '' ? null : entry.block,
        entry.postcode === '' ? null : entry.postcode,
        entry.unit === '' ? null : entry.unit,
        entry.level === '' ? null : entry.level,
        `Point(${entry.geometry.coordinates[0]} ${entry.geometry.coordinates[1]})`,
        streetPk,
      ],
    };

    try {
      const id = (await pgClient.query(insertRestaurantQuery)).rows[0].id;
      restaurantPks.push(id);
    } catch (e) {
      console.log(`seed.js: error in inserting into restaurant\n${e}`);
    }

    // populate elasticsearch restaurants index
    try {
      await esClient.index({
        index: 'restaurant',
        body: {
          id: restaurantPks[restaurantPks.length - 1],
          name: capitalize(entry.name),
          street: entry.street,
          lng: entry.geometry.coordinates[0],
          lat: entry.geometry.coordinates[1],
        },
      });
    } catch (e) {
      console.log(
        `seed.js: error in inserting into restaurant in elasticsearch\n${e}`
      );
    }
  }

  await pgClient.release();
})();

const b = (async () => {
  // populate elasticsearch blogposts index
  for (const entry of bjson) {
    try {
      await esClient.index({
        index: 'blogpost',
        body: entry,
      });
    } catch (e) {
      console.log(
        `seed.js: error in inserting into blogpost in elasticsearch\n${e}`
      );
    }
  }
})();

Promise.all([r, b]).then(() => {
  console.log('seed.js: seeding finished!');
  process.exit(0);
});
