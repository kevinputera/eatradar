const { pgPool } = require('../config/dbConfig');

(async () => {
  const pgClient = await pgPool.connect();

  const dropQuery = /* sql */ `
    DROP MATERIALIZED VIEW IF EXISTS lexeme;
  `;

  const createQuery = /* sql */ `
    CREATE MATERIALIZED VIEW lexeme AS
    SELECT word 
    FROM ts_stat(
      'SELECT to_tsvector(''simple'',name)
       FROM restaurant'
    );
    CREATE INDEX words_idx ON lexeme USING GIN (word gin_trgm_ops);
  `;

  try {
    await pgClient.query(dropQuery);
  } catch (e) {
    console.log(`materializedViews.js: error during view deletion\n${e}`);
    await pgClient.end();
    process.exit(1);
  }

  try {
    await pgClient.query(createQuery);
  } catch (e) {
    console.log(`materializedViews.js: error during view creation\n${e}`);
    await pgClient.end();
    process.exit(1);
  }
})().then(() => {
  console.log('materializedViews.js: views created!');
  process.exit(0);
});
