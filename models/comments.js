const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: String,
  content: { type: String, required: true },
  photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
});

module.exports = mongoose.model('Comment', commentSchema);
