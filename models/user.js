const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    lastname: String
});

module.exports = mongoose.model('UsersSchema', UsersSchema);
