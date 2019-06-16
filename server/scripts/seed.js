const fs = require('fs');
const { pgPool } = require('../config/dbConfig');
const { capitalize } = require('../utils/stringUtils');

const raw = fs.readFileSync('scripts/foodEstablishmentsParsed.txt');
const json = JSON.parse(raw);

let entries = [];

for (let i = 0; i < 100; i++) {
  entries.push(json[i]);
}

/* const cuisines = [
  'Chinese', 
  'Japanese', 
  'American', 
  'Indian', 
  'Korean', 
  'Italian'
]; */

// let cuisinePks = [];  
let restaurantPks = [];

(async () => {
  const pgClient = await pgPool.connect();

  // populate cuisine table with random data
  /* for (let cuisine of cuisines) {
    const query = {
      text: /* sql `
        INSERT INTO cuisine(name) 
        VALUES ($1) 
        RETURNING id;
      `,
      values: [cuisine]
    }
    
    try {
      const id = (await pgClient.query(query)).rows[0].id;
      cuisinePks.push(id);
    } catch (e) {
      console.log(`seed.js: error in inserting cuisine\n${e}`);
    }
  } */

  // populate street + restaurant table with real data
  for (let entry of entries) {
    const findStreetPkQuery = {
      text: /* sql */`
        SELECT street.id 
        FROM street 
        WHERE name = $1;
      `,
      values: [entry.street]
    }

    let streetPk;
    try {
      const findStreetPkResult = await pgClient.query(findStreetPkQuery);
      
      if (findStreetPkResult.rows.length == 0) {
        const insertStreetQuery = {
          text: /* sql */`
            INSERT INTO street(name) 
            VALUES ($1) 
            RETURNING id;
          `,
          values: [entry.street]
        }

        streetPk = (await pgClient.query(insertStreetQuery)).rows[0].id;
      } else {
        streetPk = findStreetPkResult.rows[0].id;
      }
    } catch (e) {
      console.log(`seed.js: error in checking id\n${e}`);
    }

    const insertRestaurantQuery = {
      text: /* sql */`
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
        entry.block === "" ? null : entry.block,
        entry.postcode === "" ? null : entry.postcode,
        entry.unit === "" ? null : entry.unit,
        entry.level === "" ? null : entry.level,
        `Point(${entry.geometry.coordinates[0]} ${entry.geometry.coordinates[1]})`,
        streetPk
      ]
    }

    try {
      const id = (await pgClient.query(insertRestaurantQuery)).rows[0].id;
      restaurantPks.push(id);
    } catch (e) {
      console.log(`seed.js: error in inserting into restaurant\n${e}`);
    }
  }

  // populate restaurant_cuisine table
  /* for (let i = 0; i < 200; i++) {
    const restaurantId = restaurantPks[Math.floor(Math.random() * restaurantPks.length)];
    const cuisineId = cuisinePks[Math.floor(Math.random() * cuisinePks.length)];
    const query = {
      text: /* sql `
        INSERT INTO restaurant_cuisine(restaurant_id, cuisine_id) 
        VALUES ($1, $2);
      `,
      values:[
          restaurantId,
          cuisineId
      ]
    }

    try {
      await pgClient.query(query);
    } catch (e) {
      console.log(`seed.js: error in inserting into restaurant_cuisine\n${e}`);
    }
  } */

  await pgClient.release();

})().then(() => {
  console.log('seed.js: seeding finished!');
  process.exit(0);
});       