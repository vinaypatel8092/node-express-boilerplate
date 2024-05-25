const express = require('express');
const mongoose = require('../config/db/dbConnection');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./components/author/');
const bookRoutes = require('./components/book/');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

mongoose.connect();

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
