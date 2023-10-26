const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    age: {
        type: String,
        required: false,
        default: 30
    },
    gender: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: false,
        default: Date.now // Set the default value to the current date
    },
    image: {
        type: String,
        required: false,
        default: "http://localhost:3000/img.jpeg" // Set the default value to the current date
    },
    address: String
});

// Use mongoose.model to create the User model
const UserModel = mongoose.model('customer', UserSchema);

module.exports = UserModel;