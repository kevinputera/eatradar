const { pool } = require("../db");
const faker = require("faker");

(async () => {
  const client = await pool.connect();

  let street_pk = [];
  let cuisine_pk = [];
  let restaurant_pk = [];

  // populate street table
  await (async () => {
    for (let i = 0; i < 100; i++) {
      const name = faker.address.streetAddress(); 
      const query = {
        text: 'INSERT INTO street(name) VALUES ($1) RETURNING id',
        values: [name]
      };

      let id;
      try {
        id = (await client.query(query)).rows[0].id;
      } catch (e) {
        console.log(`seed.js: error in street insert query: ${e}`);
      }
      street_pk.push(id);
    } 
  })();

  // populate cuisine table
  await (async () => {
    for (let i = 0; i < 20; i++) {
      const name = faker.random.word();
      const query = {
        text: 'INSERT INTO cuisine(name) VALUES ($1) RETURNING id',
        values: [name]
      }

      let id;
      try {
        id = (await client.query(query)).rows[0].id;
      } catch (e) {
        console.log(`seed.js: error in cuisine insert query: ${e}`);
      }
      cuisine_pk.push(id);
    }
  })();

  // populate restaurant table
  await (async () => {
    for (let i = 0; i < 500; i++) {
      const name = `${faker.name.firstName()}'s ${faker.company.catchPhrase()}`;
      const lon = faker.address.longitude();
      const lat = faker.address.latitude();
      const post = faker.address.zipCode();
      const street_id = faker.random.number(street_pk.length - 1) + 1;
      const query = {
        text: 'INSERT INTO restaurant(name, location, postcode, street_id)' + 
            'VALUES ($1, $2, $3, $4) RETURNING id',
        values: [
            name,
            `POINT(${lon} ${lat})`,
            post,
            street_id
        ]
      }

      let id;
      try {
        id = (await client.query(query)).rows[0].id;
      } catch (e) {
        console.log(`seed.js: error in restaurant insert query: ${e}`);
      }
      restaurant_pk.push(id);
    }
  })();

  // populate restaurant cuisine join table
  await (async () => {
    for (let i = 0; i < 1000; i++) {
      const restaurant_id = faker.random.number(restaurant_pk.length - 1) + 1;
      const cuisine_id = faker.random.number(cuisine_pk.length - 1) + 1;
      const query = {
        text: 'INSERT INTO restaurant_cuisine(restaurant_id, cuisine_id) VALUES ($1, $2)',
        values: [
            restaurant_id,
            cuisine_id
        ]
      }

      try {
        await client.query(query);
      } catch (e) {
        console.log(`seed.js: error in restaurant_cuisine insert query: ${e}`);
      }
    }
  })();

  await client.release();

})().then(() => {
  console.log("seeding complete!")
  process.exit(0);
});
