const authorService = require('../services/author.service');
const asyncHandler = require('../utils/asyncHandler');

exports.registerAuthor = asyncHandler(async (req, res) => {
  const author = await authorService.registerAuthor(req.body);
  res.status(201).json(author);
});

exports.getAllBooks = asyncHandler(async (req, res) => {
  const books = await authorService.getAllBooks();
  res.status(200).json(books);
});
