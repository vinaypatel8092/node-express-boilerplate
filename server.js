const express = require('express');
const mongoose = require('./config/mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./src/middlewares/error');
const authRoutes = require('./src/routes/auth.route');
const bookRoutes = require('./src/routes/book.route');
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
