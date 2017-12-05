const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User   = require('../models/users');

router.get('/login', (req, res) => {
res.render('sneakers/login.ejs', {
  message: req.session.message,
  username: req.session.username
  });
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (bcrypt.compareSync(req.body.password, user.password)){
      req.session.message = '';
      req.session.username = req.body.username;
      req.session.logged  = true;
      console.log(req.session, req.body);
      res.redirect('/')
    } else {
     console.log('else in bcrypt compare')
     req.session.message = 'Username or password are incorrect';
     res.redirect('/user/login');
    }
  } catch (err) {
    req.session.message = 'Username or password are incorrect';
    res.redirect('/user/login');
  }
});


router.post('/register', async (req, res) => {

// first we are going to hash the password
const password = req.body.password;
const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// lets create a object for our db entry;
const userDbEntry = {};
userDbEntry.username = req.body.username;
userDbEntry.password = passwordHash;

// lets put the password into the database
try {
  const user = await User.create(userDbEntry);
  console.log(user);
  // lets set up the session in here we can use the same code we created in the login
  req.session.username = user.username;
  req.session.logged  = true;
  res.redirect('/');
 } catch (err) {
   res.send('Failed to create the user');
 }
});

// export the controller
module.exports = router;
