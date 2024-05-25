/* eslint-disable class-methods-use-this */
const Book = require('../../models/bookModel');

class BookService {
    async createBook(data) {
        const newBook = await Book.create(data);
        await newBook.save();

        return newBook;
    }

    async getBooks() {
        const books = await Book.find().populate({ path: 'author', select: 'name' });

        return books;
    }
}

module.exports = new BookService();
