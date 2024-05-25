const bookService = require('./book.services');
const asyncHandler = require('../../utils/asyncHandler');
const Author = require('../../models/authorModel');
const Book = require('../../models/bookModel');

exports.createBook = asyncHandler(async (req, res) => {
    const { bookname, pages, email } = req.body;
    if (!bookname || !pages || !email) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }

    const authorExist = await Author.findOne({ email });
    if (!authorExist) {
        res.status(400);
        throw new Error('Author not exist');
    }

    const bookAvailable = await Book.findOne({ bookname });
    if (bookAvailable) {
        res.status(400);
        throw new Error('Book already exist');
    }

    const newBook = await bookService.createBook({
        bookname,
        pages,
        author: authorExist.id,
    });
    authorExist.books.push(newBook.id);
    await authorExist.save();

    res.status(201).json({ message: 'New Book Registerd', newBook });
});

exports.getBooks = asyncHandler(async (req, res) => {
    const books = await bookService.getBooks();
    res.status(200).json({ message: 'All Books', books });
});
