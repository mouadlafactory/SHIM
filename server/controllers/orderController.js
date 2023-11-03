const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/orders/:id', async (req, res, next) => {
    const customerId = req.params.id;
  
    try {
           
      const orders = await Order.find({ customer_id: customerId });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json({ order, orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/ordersInit/:id', async (req, res, next) => {
    const id = req.params.id;
  
    
    const uniqueIdentifier = generateUniqueIdentifier();
  
    try {
      
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      order.initOrderId = {
        id: uniqueIdentifier,
        status: true,
      };
      await order.save();

      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error initializing orders' });
    }
  });

  router.post('/ConfirmedOrder/:id', async (req, res, next) => {
    const id = req.params.id;
  
    
    const uniqueIdentifier = generateUniqueIdentifier();
  
    try {
      
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      order.ConfirmedOrderId = {
        id: uniqueIdentifier,
        status: true,
      };
      await order.save();

      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error initializing orders' });
    }
  });
  router.post('/ordersFinished/:id', async (req, res, next) => {
    const id = req.params.id;
  
    
    const uniqueIdentifier = generateUniqueIdentifier();
  
    try {
      
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      order.finishedOrderId = {
        id: uniqueIdentifier,
        status: true,
      };
      await order.save();

      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error initializing orders' });
    }
  });
  
  router.post('/ordersDelivered/:id', async (req, res, next) => {

    const id = req.params.id;    
    const uniqueIdentifier = generateUniqueIdentifier();
  
    try {

      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      order.deliveredOrderId = {
        id: uniqueIdentifier,
        status: true,
      };
      await order.save();

      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error initializing orders' });
    }
  });

// deleting orders
router.delete('/ordersInit/:id', async (req, res, next) => {
    const id = req.params.id;
  
    
    const uniqueIdentifier = generateUniqueIdentifier();
  
    try {
      
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      order.initOrderId = {
        id: uniqueIdentifier,
        status: false,
      };
      await order.save();

      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error initializing orders' });
    }
  });

  router.delete('/ConfirmedOrder/:id', async (req, res, next) => {
    const id = req.params.id;
  
    
    const uniqueIdentifier = generateUniqueIdentifier();
  
    try {
      
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      order.ConfirmedOrderId = {
        id: uniqueIdentifier,
        status: false,
      };
      await order.save();

      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error initializing orders' });
    }
  });
  router.delete('/ordersFinished/:id', async (req, res, next) => {
    const id = req.params.id;
  
    
    const uniqueIdentifier = generateUniqueIdentifier();
  
    try {
      
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      order.finishedOrderId = {
        id: uniqueIdentifier,
        status: false,
      };
      await order.save();

      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error initializing orders' });
    }
  });
  
  router.delete('/ordersDelivered/:id', async (req, res, next) => {

    const id = req.params.id;    
    const uniqueIdentifier = generateUniqueIdentifier();
  
    try {
              
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      order.deliveredOrderId = {
        id: uniqueIdentifier,
        status: false,
      };
      await order.save();

      res.send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error initializing orders' });
    }
  });
