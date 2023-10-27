const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    name: { type: String, required: true },

})