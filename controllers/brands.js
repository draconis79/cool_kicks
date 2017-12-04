// dependencies
const express = require('express');
const router = express.Router();

// models
const Sneaker = require('../models/sneakers.js');
const Brand = require('../models/brands.js');

// create route
router.post('/', async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.redirect('back');
    } catch (err) {
        res.send(err.message);
    }
});

// routes
router.get('/', async (req, res) => {
    //this brand needs to be lowercase below. becareful of this...
    const allBrands = await Brand.find().populate('sneaker');
    res.send(allBrands);
});

// read route index
router.get('/sneaker_gallery', async (req, res) => {
  const allBrands = await Brand.find().populate('sneaker');
  res.render('brands/index.ejs', {allBrands});
})

module.exports = router;
