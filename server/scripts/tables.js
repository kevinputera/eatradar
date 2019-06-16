const { pgPool } = require("../config/dbConfig");

(async () => {
  const pgClient = await pgPool.connect();

  const dropQuery = /* sql */`
    DROP TABLE IF EXISTS restaurant_cuisine;
    DROP TABLE IF EXISTS restaurant;
    DROP TABLE IF EXISTS cuisine;
    DROP TABLE IF EXISTS street;
  `;

  const createQuery = /* sql */`
    CREATE TABLE street (
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
      block VARCHAR(10),
      postcode VARCHAR(20),
      unit VARCHAR(10),
      level VARCHAR(10),
      location GEOGRAPHY(Point) NOT NULL,
      google_places_id VARCHAR(200),
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
    );
  `;
  
  try {
    await pgClient.query(dropQuery);
  } catch (e) {
    console.log(`tables.js: error during table deletion\n${e}`);
    await pgClient.end();
    process.exit(1);
  }
  
  try {
    await pgClient.query(createQuery);
  } catch (e) {
    console.log(`tables.js: error during table creation\n${e}`);
    process.exit(1);
  } finally {
    await pgClient.release();
  }

})().then(() => {
  console.log("tables.js: tables created!");
  process.exit(0);
});