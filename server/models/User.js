const mongoose = require('mongoose');
const skillsSchema = require('../models/Skills');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const LanguageSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    proficiency: {
        type: String,
        required: false
    }
});

const UserSchema = new mongoose.Schema({
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
    description:{
        type: String,
        required: false
    },
    languages: {
        type: [LanguageSchema],
        required: false
    },
    skills:{
        type:[skillsSchema],
        required: false
    },
    certification: [{
        name: {
            type: String,
            required: false
        },
        issuer: {
            type: String,
            required: false
        }
    }],
    
    createdAt:{
        type: Date,
        default: Date.now()
    },
    
    email: {
        type: String,
        required: [false, "Please enter your email!"],
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
    role:{
        type: String,
        default: "user",
      },
    updatedAt: {
        type: Date,
        default: Date.now()        
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,

    categoryId: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
        required: false
    },
    
    subCategoryId: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory'
        }],
        required: false
    }, 
    
    badge: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
        default: 'bronze'
    },
    successfullTransctions:{
        type: Number,
    }

    
});

//  Hash password
UserSchema.pre("save", async function (next){
    if(!this.isModified("password")){
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // jwt token
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
  
  // compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };




// Use mongoose.model to create the User model
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
