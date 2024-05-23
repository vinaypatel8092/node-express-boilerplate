const bookService = require('../services/book.service');
const asyncHandler = require('../utils/asyncHandler');

exports.createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook(req.body);
  res.status(201).json(book);
});

exports.getBooks = asyncHandler(async (req, res) => {
  const books = await bookService.getBooks();
  res.status(200).json(books);
});
