const express = require('express');
const router  = express.Router();
const methodOverride = require('method-override');

// models
const Sneaker = require('../models/sneakers.js');
const Brand = require('../models/session.js');
const Comment = require('../models/comments.js');

// middleware
router.use(methodOverride('_method'));

// routes

// index route
router.get('/', async (req, res) => {
    const allSneakers = await Sneaker.find();
    // res.send('sneakers index');
    res.render(
        'sneakers/index.ejs', {
            sneakers: allSneakers,
            username: req.session.username
        });
} else {
  res.redirect('/user/login');
}
});

// new route
router.get('/new', async (req, res) => {
  res.render('sneakers/new.ejs')
})

// show route
router.get('/:id', async (req, res) => {
    const oneSneaker = await Sneaker.findById(req.params.id);
    const brands = await Comment.find({
        sneaker: oneSneaker._id
    });
    res.render('sneaker/show.ejs', {
        oneSneaker: oneSneaker,
        comments: comments,
        username: req.session.username
    });
});

// create route
router.post('/', async (req, res) => {
    try {
        const newSneaker = await Sneaker.create(req.body);
        res.redirect('/sneakers');
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;
