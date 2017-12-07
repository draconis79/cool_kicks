//dependencies
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');


//Models
const Sneaker = require('../models/sneakers.js');


//Index route
router.get('/', async (req, res) => {
    const allSneakers = await Sneaker.find();
    res.render('index.ejs', { allSneakers });
});

//Index of sneakers_mongoose_router
// Create New sneakers
router.post('/', async (req, res) => {
  console.log('POST route accessed');
  try {
    const newSneaker = await Sneaker.create( req.body );
    res.redirect('/sneakers')
  } catch (err) {
    res.render('new.ejs', {err: err.message});
  }
});

// New sneaker
router.get('/new', (req, res) => {
  // res.send('new');
  res.render('new.ejs');
});

// New Sneaker
router.post('/new', (req, res) => {
  console.log('create route accessed');
  console.log(req.body);
  res.send(req.body);
});

// Show route for sneakers
// Individual sneaker
router.get('/:id', async (req, res) => {
  let oneSneaker = await Sneaker.findById( req.params.id );
  // res.send(oneSneaker);
  res.render('show.ejs', { oneSneaker });
});


// Edit Sneaker
router.get('/:id/edit', async (req, res) => {
  const sneakers = await Sneaker.findById(req.params.id);
  res.render(
    'edit.ejs',
    {
        sneaker: sneakers
    }
  );
});

// Edit submit Sneakers
router.put('/:id', async (req, res) => {
  let sneakers = await Sneaker.findByIdAndUpdate(req.params.id, req.body);
 sneakers[req.params.id] = sneakers;
 res.redirect('/sneakers/');
});


// Delete sneakers
router.delete('/:id', async (req, res) => {
  const sneaker = await Sneaker.findByIdAndRemove(req.params.id);
  // sneakers.splice(req.params.index, 1);
  res.redirect('/sneakers');
});



module.exports = router;
