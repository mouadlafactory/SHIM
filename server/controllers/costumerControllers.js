const express = require('express');
const router = express.Router();
const Customer = require('../models/Costumer');

// get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'An error occurred while fetching customers.' });
  }
});
// create a new customers
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
//  retrieves all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
   console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'An error occurred while fetching customers.' });
  }
});
// get customers by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await Customer.findById(id);
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
// Update the customer's data
router.put('/:id', async (req, res) => {
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
// delete customers
router.delete('/customers/:id', async (req, res) => {
  try {
    await Customer.findByIdAndRemove(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'An error occurred while deleting the customer.' });
  }
});
// Search for a customer
router.get('/customers/search', async (req, res) => {
  try {
    const searchTerm = req.query.q; // Get the search term from the query parameters
    const customers = await Customer.find({ $text: { $search: searchTerm } });
    res.json(customers);
  } catch (error) {
    console.error('Error searching customers:', error);
    res.status(500).json({ error: 'An error occurred while searching customers.' });
  }
});

// Get the customer's profile
router.get('/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id; // Get the customer ID from the request parameters
    const customer = await Customer.findById(customerId); // Find the customer by their ID
    res.json(customer); // Send the customer profile as a JSON response
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'An error occurred while fetching the customer.' });
  }
});  

module.exports = router;
