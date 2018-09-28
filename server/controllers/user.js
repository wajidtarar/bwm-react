
const User = require('../models/user');
const {normalizeErrors} = require('../helpers/mongoose');

exports.auth = function(req, res) {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).send({errors: [{title: 'Email/password Error!', 
                                    description: 'both email and password required1 '}]});
    }

    User.findOne({email}, function(err, existingUser){
        
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(!existingUser){
            return res.status(422).send({errors: [{title: 'Invalid User !', 
                        description: 'User doesn not exist....'}]});
        }
        if(existingUser.isSamePassword(password)){
            //return JWT token
        } else{
            return res.status(422).send({errors: [{title: 'Wrong Data !', 
                        description: 'User name and passsword do not match.'}]});
        }
    });
}

exports.auth1 = function(req, res) {
    const {username, email, password, passwordConfirmation} = req.body; 
    
    if(!email || !password){
        return res.status(422).send({errors: [{title: 'Email/password Error!', 
                                    description: 'both email and password required1 '}]});
    }

    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(existingUser){
            return res.status(422).send({errors: [{title: 'User Error!', 
                        description: 'User already exist....'}]});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            return res.json({'registered': true});
        });

    });


    // res.json({username, email});
}

exports.register = function(req, res) {
    const {username, email, password, passwordConfirmation} = req.body; 
    
    if(!email || !password){
        return res.status(422).send({errors: [{title: 'Email/password Error!', 
                                    description: 'both email and password required1 '}]});
    }
    if(password !== passwordConfirmation){
        return res.status(422).send({errors: [{title: 'Password Error!', 
                                    description: 'Password and confirmation need to be same'}]});
    }


    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(existingUser){
            return res.status(422).send({errors: [{title: 'User Error!', 
                        description: 'User already exist....'}]});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            return res.json({'registered': true});
        });

    });


    // res.json({username, email});
}