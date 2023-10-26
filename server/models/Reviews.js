const ReviewSchema = new mongoose.Schema({
    Comment: { type: String, required: false },
    
    note: { 
        type: Float, required: true 
    },

    UserID:{
        type :mongoose.Schema.Types.ObjectId , ref:'User'
    },
    
    CostumerID:{
        type :mongoose.Schema.Types.ObjectId ,ref:'Costumer'
    }
    
    
    });
    module.exports = Review = mongoose.model('Review', ReviewSchema);
