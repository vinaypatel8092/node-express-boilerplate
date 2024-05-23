const Author = require('../models/author.model');
const Book = require('../models/book.model');

class AuthorService {
  async registerAuthor(data) {
    const author = new Author(data);
    return await author.save();
  }

  async getAllBooks() {
    return await Book.find().populate('author');
  }
}

module.exports = new AuthorService();
