const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Types.ObjectId,
   },
  userId: { 
    type: mongoose.Types.ObjectId,
    ref:'User',
    required: true
 },

  status:{
    enum:["pending","completed"],
    default:null,
  },
  costumerId:{
    type: mongoose.Types.ObjectId,
    ref:'Costumer',
    required: true

  },
  date: { type: Date, default: Date.now },

  initOrderId:{
    id: {
      type: String,
      unique: true, // Ensure the identifier is unique
    },
    status: {
      type: Boolean,
      default: false
    },
  },

  finishedOrderId:{ 
    id: {
      type: String,
      unique: true, // Ensure the identifier is unique
    },
    status: {
      type: Boolean,
      default: false
    },
  },

  ConfirmedOrderId:{
    id: {
      type: String,
      unique: true, // Ensure the identifier is unique
    },
    status: {
      type: Boolean,
      default: false
    },
  },
  DeliveredOrderId:{
    id: {
      type: String,
      unique: true, // Ensure the identifier is unique
    },
    status: {
      type: Boolean,
      default: false
    },
  }


  // Additional properties related to transactions...
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

  