const { Book, Review } = require('../models');

const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        return res.status(201).json({
            book,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Review
                }
            ]
        });
        return res.status(200).json({ books });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({
            where: { id: id },
            include: [
                {
                    model: Review
                }
            ]
        });
        if (book) {
            return res.status(200).json({ book });
        }
        return res.status(404).send('Book with the specified ID does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Book.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedBook = await Book.findOne({ where: { id: id } });
            return res.status(200).json({ review: updatedBook });
        }
        throw new Error('Book not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Book deleted");
        }
        throw new Error("Book not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
}