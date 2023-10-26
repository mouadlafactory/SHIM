const express = require('express');
const router = express.Router();
const Customer = require('../models/Costumer');

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'An error occurred while fetching customers.' });
  }
});

router.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'An error occurred while creating the customer.' });
  }
});

router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
   console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'An error occurred while fetching customers.' });
  }
});

router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.sendStatus(404);
    } else {
      res.json(customer);
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'An error occurred while fetching the customer.' });
  }
});

router.put('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) {
      res.status(404).json({ message: 'Customer not found.' });
    } else {
      res.json(customer);
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'An error occurred while updating the customer.' });
  }
});

router.delete('/customers/:id', async (req, res) => {
  try {
    await Customer.findByIdAndRemove(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'An error occurred while deleting the customer.' });
  }
});

module.exports = router;
