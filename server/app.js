const express = require('express');

const restaurantRoute = require('./routes/restaurants');
const reviewRoute = require('./routes/reviews');

const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;

// Restaurant API routes
app.use('/restaurants', restaurantRoute);
app.use('/reviews', reviewRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
