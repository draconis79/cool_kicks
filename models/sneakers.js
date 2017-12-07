const mongoose = require('mongoose');

// schema
const sneakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  quantity: Number,
  image: String
});


// export the model
module.exports = mongoose.model('Sneaker', sneakerSchema);
