
const express = require('express');
const router = express.Router();
const Bookings = require('../models/bookings.js');
const UserCtrl = require('../controllers/user')
const BookingCtrl = require('../controllers/Booking')


router.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking);


module.exports = router;