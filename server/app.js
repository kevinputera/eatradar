const express = require('express');

const { enableCors } = require('./middlewares/corsMiddleware');

const restaurantLocationRoute = require('./routes/restaurantLocationRoute');
const restaurantRoute = require('./routes/restaurantRoute');
const detailRoute = require('./routes/detailRoute');
const reviewRoute = require('./routes/reviewRoute');
const blogPostRoute = require('./routes/blogPostRoute');
const yelpRoute = require('./routes/yelpRoute');

const app = express();

// Middlewares
app.use(enableCors);

// Use routes
app.use('/restaurant-locations', restaurantLocationRoute);
app.use('/restaurants', restaurantRoute);
app.use('/details', detailRoute);
app.use('/reviews', reviewRoute);
app.use('/blogposts', blogPostRoute);
//This route was written to test Yelp Routing
app.use('/yelpAPI', yelpRoute);

const PORT = process.env.EXPRESS_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
