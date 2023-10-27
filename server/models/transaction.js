const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
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
  // Additional properties related to transactions...
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

  