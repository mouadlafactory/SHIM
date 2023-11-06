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



module.exports = router;
