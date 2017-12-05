// dependencies
const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const session  = require('express-session');
const bcrypt 	 = require('bcrypt');
const app      = express();
const PORT     = process.env.PORT || 3000;

// process.env.MONGOB_URI
// connect to database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cool-kicks';

mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

// test database connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

secret: "akjfdskfjdsfjsfk", //random string here
resave: false,
saveUninitialized: false
}));

// controllers
const sneakersController = require('./controllers/sneakers.js');
const commentsController = require('./controllers/comments.js');
const sessionsController = require('./controllers/session.js');

app.use('/sneakers', sneakersController);
app.use('/comments', commentsController);
app.use('/user', sessionsController);

// root route
app.get('/', (req, res) => res.redirect('/sneakers'));



// check if PORT is working and listening
app.listen(PORT, () => {
  console.log('===================================');
  console.log('Cool-Kicks app on port: ', PORT);
  console.log('===================================');
});
