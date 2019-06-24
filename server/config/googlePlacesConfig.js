const mapsFuncs = require('@google/maps');

const placesClient = mapsFuncs.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY_MASTER,
  timeout: 2000,
  Promise: Promise,
});

module.exports = { placesClient };
