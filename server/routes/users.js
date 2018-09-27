
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('auth', function(req, res){
    Rental.find({}, function(err, foundRentals){
        res.json(foundRentals);
    });
});

router.get('/register', function(req, res){
    const rentalId = req.params.id;
});

module.exports = router;