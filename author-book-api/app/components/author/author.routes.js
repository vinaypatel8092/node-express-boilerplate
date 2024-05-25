const express = require('express');

const router = express.Router();
const authorController = require('./author.controller');

router.post('/register', authorController.registerAuthor);
router.get('/allbooks', authorController.getAllBooks);

module.exports = router;
