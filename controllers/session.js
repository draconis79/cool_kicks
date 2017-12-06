const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User   = require('../models/user.js');

// login
router.get('/login', (req, res) => {
res.render('home/login.ejs', {
  message: req.session.message,
  });
});

// login data
// checking to see if the user is already a registered user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (bcrypt.compareSync(req.body.password, user.password)){
      //below: if user tries to log in, find user in the database, and if password matches, then run the code below.
      req.session.username = req.body.username;
      req.session.logged  = true;
      console.log(req.session);
      res.redirect('/sneakers')
    } else {
     console.log('bad password')
     req.session.message = 'Username or password are incorrect';
     res.redirect('/user/login');
    }
  } catch (err) {
    console.log(err.message);
    req.session.message = 'Username or password are incorrect';
    res.redirect('/user/login');
  }
});

// register
router.post('/register', async (req, res) => {

// first we are going to hash the password
const password = req.body.password;
const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const username = req.body.username;
const name = req.body.name;
const lastname = req.body.lastname;
// lets create a object for our db entry;
const userDbEntry = {};

userDbEntry.username = req.body.username;
userDbEntry.password = passwordHash;
userDbEntry.name = name;
userDbEntry.lastname = lastname;

console.log(userDbEntry);

// lets put the password into the database, User schema
try {
  const user = await User.create(userDbEntry);
  console.log(user);
  // lets set up the session in here we can use the same code we created in the login
  req.session.username = user.username;
  req.session.name = user.name;
  req.session.lastname = user.lastname;
  req.session.logged  = true;
  res.redirect('/user/login'); // redirecting user to login
 } catch (err) {
   console.log(err.message);
   res.send('Failed to create the user');
 }
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/sneakers/home');
});

router.get('/update', (req, res) => {
});

// export the controller
module.exports = router;
