const mongoose = require('mongoose');

// schema
const sneakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  color: String,
  release_date: String,
  submitted_by: String,
  image: String
});


// export the model
module.exports = mongoose.model('Sneaker', sneakerSchema);
