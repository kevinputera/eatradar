const { pgPool } = require('../config/dbConfig');
const { esClient } = require('../config/elasticsearchConfig');

const sql = (async () => {
  const pgClient = await pgPool.connect();

  const dropQuery = /* sql */ `
    DROP TABLE IF EXISTS restaurant_cuisine;
    DROP TABLE IF EXISTS restaurant;
    DROP TABLE IF EXISTS cuisine;
    DROP TABLE IF EXISTS street;
    DROP MATERIALIZED VIEW IF EXISTS lexeme;
    DROP EXTENSION IF EXISTS pg_trgm;
  `;

  const createQuery = /* sql */ `
    CREATE EXTENSION pg_trgm;

    CREATE TABLE street (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) UNIQUE NOT NULL
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
    CREATE INDEX name_ts_idx ON restaurant USING GIN (to_tsvector('simple', name));
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
})();

const es = (async () => {
  try {
    const exists = await esClient.indices.exists({
      index: 'blogpost',
    });
    if (exists.body) {
      await esClient.indices.delete({
        index: 'blogpost',
      });
    }
  } catch (e) {
    console.log(`tables.js: error during blogpost index deletion`);
  }

  try {
    const exists = await esClient.indices.exists({
      index: 'restaurant',
    });
    if (exists.body) {
      await esClient.indices.delete({
        index: 'restaurant',
      });
    }
  } catch (e) {
    console.log(`tables.js: error during restaurant index deletion`);
  }

  try {
    await esClient.indices.create({
      index: 'blogpost',
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 0,
        },
      },
    });
  } catch (e) {
    console.log(`tables.js: error during blogpost index creation`);
  }

  try {
    await esClient.indices.create({
      index: 'restaurant',
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 0,
          max_result_window: 40000,
        },
      },
    });
  } catch (e) {
    console.log(`tables.js: error during restaurant index creation`);
  }
})();

Promise.all([sql, es]).then(() => {
  console.log('tables.js: tables created!');
  process.exit(0);
});
