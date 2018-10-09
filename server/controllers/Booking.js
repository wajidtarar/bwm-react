
const Booking = require('../models/bookings');
const Rental = require('../models/Rental');
const {normalizeErrors} = require('../helpers/mongoose');
const moment = require('moment');

exports.createBooking = function(req, res){

    const {startAt, endAt, totalPrice, guests, days, rental} = req.body;
    const user = res.locals.user;

    const booking = new Booking({startAt, endAt, totalPrice, guests, days});

    Rental.findById(rental._id)
          .populate('bookings')
          .populate('user')
          .exec(function(err, foundRental){

            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            if(foundRental.user.id === user.id){
                return res.status(422).send({errors: [{title: 'Invalid Booking !', 
                    description: 'User cant book own rental ok?'}]});
            }
            if(isValidBooking(booking, foundRental)){

                foundRental.bookings.push(booking);
                foundRental.save();
                
                booking.save(function(err){
                    if(err){
                        return res.status(422).send({errors: normalizeErrors(err.errors)});
                    }
                    return res.json({'booking123': true});
                });


                // booking.save();
                // return res.json({'booking': true});
            } else{
                return res.status(422).send({errors: [{title: 'Invalid Booking !', 
                    description: 'Chosen dates are already token.'}]});            
            }
          });

    // res.json({'createBooking': 'ok'})
} 


function isValidBooking(proposedBooking, foundRental){

    let isValid = true;

    if(foundRental.bookings && foundRental.bookings.length){
        isValid = foundRental.bookings.every(function(booking){
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd   = moment(proposedBooking.endAt);

            const actualStart   = moment(booking.startAt);
            const actualEnd     = moment(booking.startAt);

            return ((actualStart < proposedStart && actualEnd < proposedStart)
                        || proposedEnd < actualEnd && proposedEnd < actualStart);
        });
    }

    return isValid;
}