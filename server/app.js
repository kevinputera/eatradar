const express = require('express');

const restaurantRoute = require('./routes/restaurantRoute');
const detailRoute = require('./routes/detailRoute');
const reviewRoute = require('./routes/reviewsRoute');
const blogPostRoute = require('./routes/blogPostRoute');

const app = express();

// Use routes
app.use('/restaurants', restaurantRoute);
app.use('/details', detailRoute);
app.use('/reviews', reviewRoute);
app.use('/blogposts', blogPostRoute);

const PORT = process.env.EXPRESS_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
