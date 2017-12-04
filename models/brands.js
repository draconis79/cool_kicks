const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: String,
    image: String
});

module.exports = mongoose.model('Brand', brandSchema);
