/* eslint-disable class-methods-use-this */
const Author = require('../../models/authorModel');
const Book = require('../../models/bookModel');

class AuthorService {
    async registerAuthor(data) {
        const author = await Author.create(data);
        await author.save();
        return author;
    }

    async getAllBooks(data) {
        const author = await Author.findOne(data).populate({ path: 'books', select: ['bookname', 'pages'] });
        return author;
    }
}

module.exports = new AuthorService();
