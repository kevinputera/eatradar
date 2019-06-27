const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: 'http://localhost:9200',
  requestTimeout: 3000,
});

module.exports = { esClient };
