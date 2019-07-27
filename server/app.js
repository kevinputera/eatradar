const express = require('express');

const { enableCors } = require('./middlewares/corsMiddleware');

const restaurantLocationRoute = require('./routes/restaurantLocationRoute');
const restaurantRoute = require('./routes/restaurantRoute');

const app = express();

// Middlewares
app.use(enableCors);

// Use routes
app.use('/restaurant-locations', restaurantLocationRoute);
app.use('/restaurants', restaurantRoute);

const PORT = process.env.EXPRESS_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
