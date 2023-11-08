const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { Comment, note, UserID, CostumerID, orderId } = req.body;
    const review = new Review({ Comment, note, UserID, CostumerID, orderId });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Could not create the review' });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().exec();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve reviews' });
  }
});

// Update a review by ID
router.put('/:id', async (req, res) => {
  try {
      const { Comment, note, UserID, CostumerID, orderId } = req.body;
      const reviewId = req.params.id;

      // Find the review by ID
      const review = await Review.findById(reviewId);

      if (!review) {
          return res.status(404).json({ error: 'Review not found' });
      }
      // Update review properties
      review.Comment = Comment;
      review.note = note;
      review.UserID = UserID;
      review.CostumerID = CostumerID;
      review.orderId = orderId;
      // Save the updated review
      await review.save();

      res.json(review);
  } catch (error) {
      res.status(500).json({ error: 'Could not update the review' });
  }
});

// DELETE a review by ID
router.delete('/:id', async (req, res) => {
  try {
      const reviewId = req.params.id;
      const deletedReview = await Review.findByIdAndRemove(reviewId);
      if (!deletedReview) {
          return res.status(404).json({ message: 'Review not found' });
      }
      res.json({ message: 'Review deleted successfully', data: deletedReview });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;
