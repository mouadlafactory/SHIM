// Controllers/reviewControllers.js

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


module.exports = router;
