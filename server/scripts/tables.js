const { Client } = require("pg");

(async () => {
  const client = new Client();
  await client.connect();

  const dropQuery = 
      `DROP TABLE IF EXISTS restaurant_cuisine;
       DROP TABLE IF EXISTS restaurant;
       DROP TABLE IF EXISTS cuisine;
       DROP TABLE IF EXISTS street;`;

  const createQuery = 
      `CREATE TABLE street (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) UNIQUE NOT NULL
      );

      CREATE TABLE cuisine (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
      );

      CREATE TABLE restaurant (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        location GEOGRAPHY(Point) NOT NULL,
        postcode VARCHAR(20),
        street_id INTEGER NOT NULL,
        FOREIGN KEY (street_id) REFERENCES street(id)
          ON UPDATE CASCADE ON DELETE CASCADE
      );
      CREATE INDEX location_geog_idx ON restaurant USING GIST (location);

      CREATE TABLE restaurant_cuisine (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER NOT NULL,
        cuisine_id INTEGER NOT NULL,
        FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
          ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (cuisine_id) REFERENCES cuisine(id)
          ON UPDATE CASCADE ON DELETE CASCADE
      );`;
  
  try {
    await client.query(dropQuery);
  } catch (e) {
    console.log(`tables.js: error during deletion: ${e}`);
    await client.end();
  }
  
  try {
    await client.query(createQuery);
  } catch (e) {
    console.log(`tables.js: error during creation: ${e}`);
  } finally {
    await client.end();
  }

})().then(() => {
  console.log("tables.js: tables created!");
  process.exit(0);
});