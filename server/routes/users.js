
const express = require('express');
const User = require('../controllers/user');

const router = express.Router();

router.post('/auth', User.auth);

router.post('/register', User.register);


router.post('', function(req, res){
    res.json({username: 'abc'}) ;
});


module.exports = router;