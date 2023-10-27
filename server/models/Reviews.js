const ReviewSchema = new mongoose.Schema({
    Comment: { type: String, required: false },
    
    note: { 
        type: Float, required: true 
    },

    UserID:{
        type :mongoose.Schema.Types.ObjectId , ref:'User'
    },
    
    CostumerID:{
        type :mongoose.Schema.Types.ObjectId ,
        ref:'Costumer',required:true},
    
    commnadId:{
        type :mongoose.Schema.Types.ObjectId ,
        ref:'Command',required:true
    }
    
    
    });
    module.exports = Review = mongoose.model('Review', ReviewSchema);
