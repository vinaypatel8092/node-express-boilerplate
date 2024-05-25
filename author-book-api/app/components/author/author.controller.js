const authorService = require('./author.services');
const asyncHandler = require('../../utils/asyncHandler');
const Author = require('../../models/authorModel');

exports.registerAuthor = asyncHandler(async (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        res.status(400);
        throw new Error('All fileds are mandatory');
    }

    const authorExist = await Author.findOne({ email });
    if (authorExist) {
        res.status(400);
        throw new Error('Author already exist');
    }

    const author = await authorService.registerAuthor(req.body);
    res.status(201).json({ message: 'Author Registered Successfully', author });
});

exports.getAllBooks = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const author = await authorService.getAllBooks(req.body);

    if (!author) {
        res.status(400);
        throw new Error('Author not found');
    }
    res.status(200).json(author);
});
