const mongoose = require('mongoose');

const costumerSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: false
    },

    lastName:{
        type: String,
        required: false
    },
    gender:{
        type: String,
        required: true
    },
    
    age: {
        type: String,
        required: false,
        default: 30
    },
    
    createdAt:{
        type: Date,
        default: Date.now()
    },
    
    email: {
        type: String,
        required: false,
        unique:true
    },
   
    username: {
        type: String,
        required: false,
        unique:true       
    },
    
    image: {
        type: String,
        required: false,
        default: "http://localhost:3000/img.jpeg" // Set the default value to the current date
    },
    City:{
        type: String,
        required: false

    },
    password:{
        type: String,
        required: false,
        minLength: [7, "Password should be greater than 7 characters"],
        select: false,  

    },
    avatar:{
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
     },
    
    updatedAt: {
        type: Date,
        default: Date.now()        
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});

costumerSchema.pre("save", async function (next){
    if(!this.isModified("password")){
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // jwt token
  costumerSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
  
  // compare password
  costumerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };




// Use mongoose.model to create the User model
const CostumerModel = mongoose.model('costumer', costumerSchema);

module.exports = CostumerModel;