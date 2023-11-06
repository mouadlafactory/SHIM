const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    Comment: { type: String, required: false },
    
    note: { 
        type: Number, required: true 
    },

    UserID:{
        type :mongoose.Schema.Types.ObjectId , ref:'User'
    },
    
    CostumerID:{
        type :mongoose.Schema.Types.ObjectId ,
        ref:'Costumer',required:true},
    
    orderId:{
        type :mongoose.Schema.Types.ObjectId ,
        ref:'Command',required:false
    }
    
    
    });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review
