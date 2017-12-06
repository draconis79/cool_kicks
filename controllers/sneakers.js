const express = require('express');
const methodOverride = require('method-override');
const router  = express.Router();

// models
const Sneaker = require('../models/sneakers.js');
const Brand = require('../models/session.js');
const Comment = require('../models/comments.js');
const User = require('../models/user.js');

// middleware
router.use(methodOverride('_method'));
router.use(express.static('public'));

// routes

// index route
router.get('/sneakers', async (req, res) => {
  if(req.session.logged) {
    const user = await User.find({username: req.session.username});
    const userSneakers = await Sneaker.find({user: user[0]._id});
    console.log(user);
    console.log(userSneakers);
    // res.send('sneakers index');
    res.render(
        'sneakers/index.ejs', {user, userSneakers});
} else {
 res.redirect('/user/login');
}
});

// new route
router.get('/new', async (req, res) => {
  res.render('sneakers/new.ejs')
})

// show route
router.get('/sneakers/:id', async (req, res) => {
    const oneSneaker = await Sneaker.findById(req.params.id);
    const comments = await Comment.find({
        sneaker: oneSneaker._id
    });
    res.render('sneakers/show.ejs', {
        sneakers, comments
    });
});

// create route
router.post('/sneakers', async (req, res) => {
    try {
        const newSneaker = await Sneaker.create(req.body);
        res.redirect('/sneakers');
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;
