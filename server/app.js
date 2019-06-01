const express = require('express');
const app = express();
const path = require('path');
//Port declaration, to either use environment variable or pre defined
const PORT = process.env.PORT || 5000;

//Setting static folder to access html files
app.use(express.static(path.join(__dirname, 'public')));

//Restaurant API routes
app.use('/api/restaurants', require('./routes/api/restaurants'));
app.use('/api/reviews', require('./routes/api/reviews'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
