const express = require('express');

const { enableCors } = require('./middlewares/corsMiddleware');

const restaurantRoute = require('./routes/restaurantRoute');
const detailRoute = require('./routes/detailRoute');
const reviewRoute = require('./routes/reviewRoute');
const blogPostRoute = require('./routes/blogPostRoute');

const app = express();

// Middlewares
app.use(enableCors);

// Use routes
app.use('/restaurants', restaurantRoute);
app.use('/details', detailRoute);
app.use('/reviews', reviewRoute);
app.use('/blogposts', blogPostRoute);

const PORT = process.env.EXPRESS_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
