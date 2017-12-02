// dependencies
const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const app      = express();
const PORT     = 3000;

// connect to database
const mongoURI = 'mongodb://localhost:27017/cool-kicks';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

// test database connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// controllers
app.use('/sneakers', sneakersController);

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(morgan('dev'));

// root route
app.get('/', (req, res) => res.redirect('/sneakers'));



// check if PORT is working and listening
app.listen(PORT, () => {
  console.log('===================================');
  console.log('Cool-Kicks app on port: ', PORT);
  console.log('===================================');
});
