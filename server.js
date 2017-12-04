// dependencies
const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const app      = express();
const PORT     = 3000;

// process.env.MONGOB_URI
// connect to database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cool-kicks';

mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

// test database connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// controllers
const sneakersController = require('./controllers/sneakers.js');
const brandsController = require('./controllers/brands.js');

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/sneakers', sneakersController);
app.use('/brands', brandsController);

// root route
app.get('/', (req, res) => res.redirect('/sneakers'));



// check if PORT is working and listening
app.listen(PORT, () => {
  console.log('===================================');
  console.log('Cool-Kicks app on port: ', PORT);
  console.log('===================================');
});
