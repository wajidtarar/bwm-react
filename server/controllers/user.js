
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

const User = require('../models/user');
const {normalizeErrors} = require('../helpers/mongoose');

exports.auth = function(req, res) {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).send({errors: [{title: 'Email/password Error!', 
                                    description: 'both email and password required1 '}]});
    }

    User.findOne({email}, function(err, user){
        
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(!user){
            return res.status(422).send({errors: [{title: 'Invalid User !', 
                        description: 'User doesn not exist....'}]});
        }
        if(user.isSamePassword(password)){
            //return JWT token

           const token =  jwt.sign({
                userId: user.id,
                username: user.username,
              }, config.SECRET, { expiresIn: '1h' });    
              
            return res.json(token);
        } else{
            return res.status(422).send({errors: [{title: 'Wrong Data !', 
                        description: 'User name and passsword do not match.'}]});
        }
    });
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

exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    if(token){
        const user = parseToken(token);
        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            } 
            if(user){
                res.locals.user = user;
                next();
            }else{
                return res.status(422).send({errors: [{title: 'No authorization', description: 'User need to lognt o access this.....'}]});
            }
        });
    }else {
        return res.status(422).send({errors: [{title: 'No authorization', description: 'User need to lognt o access this.....'}]});
    }
}

function parseToken(token){
    // verify a token symmetric - synchronous
    var verify =  jwt.verify(token.split(' ')[1], config.SECRET);
    return verify;
}