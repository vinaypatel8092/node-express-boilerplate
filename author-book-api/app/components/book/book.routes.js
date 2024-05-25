const express = require('express');

const router = express.Router();
const bookController = require('./book.controller');

router.post('/createbook', bookController.createBook);
router.get('/allbooks', bookController.getBooks);

module.exports = router;
