const Book = require('../models/book.model');
const Author = require('../models/author.model');

class BookService {
  async createBook(data) {
    const book = new Book(data);
    const savedBook = await book.save();

    await Author.findByIdAndUpdate(savedBook.author, {
      $push: { books: savedBook._id }
    });

    return savedBook;
  }

  async getBooks() {
    return await Book.find().populate('author');
  }
}

module.exports = new BookService();
