const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');

router.post('/register', authorController.registerAuthor);
router.get('/allbooks', authorController.getAllBooks);

module.exports = router;
