const { User, Review, Book } = require('../models');
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Review
                }
            ]
        });
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id: id },
            include: [
                {
                    model: Review
                }
            ]
        });
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).send('User with the specified ID does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = await User.findOne({ where: { id: id } });
            return res.status(200).json({ user: updatedUser });
        }
        throw new Error('User not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};



const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        return res.status(201).json({
            review,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll()
        return res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findOne({
            where: { id: id},
        })
        if (review) {
            return res.status(200).json({ review });
        }
        return res.status(404).send('Review with the specified ID does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Review.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedReview = await Review.findOne({ where: { id: id } });
            return res.status(200).json({ review: updatedReview });
        }
        throw new Error('Review not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteReview = async (req, res) => { 
    try {
        const { id } = req.params;
        const deleted = await Review.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Review deleted");
        }
        throw new Error("Review not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createBook

const getAllBooks

const getBookById

const updateBook

const deleteBook

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,

    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,

    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
}