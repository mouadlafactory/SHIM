const express = require('express');
const router = express.Router();
const Costumer = require('../models/Costumer');

router.get('/', async (req, res) => {
    try {
      const users = await Costumer.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
  });

module.exports = router;
// test
//test2
