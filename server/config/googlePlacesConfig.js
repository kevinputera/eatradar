const mapsFuncs = require('@google/maps');

const placesClient = mapsFuncs.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise
});

module.exports = { placesClient };