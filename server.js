// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

// config
const PORT = 3000;

// db
const mongoURI = 'mongodb://localhost:27017/sneakers';
mongoose.connect(mongoURI, { useMongoClient: true });
mongoose.Promise = global.Promise;

// db error / success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// models
const Sneaker = require('./controllers/sneakers.js');
app.use('/sneakers', Sneaker);

// root route
app.get('/', (req, res) => {
    res.redirect('/sneakers');
})

//:ear
app.listen(PORT, () => console.log('running on PORT: ', PORT));
