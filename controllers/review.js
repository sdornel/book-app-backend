const { Review } = require('../models');

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

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
}