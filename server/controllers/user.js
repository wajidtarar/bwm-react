
const User = require('../models/user');

exports.auth = function(req, res) {

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
            return res.status(422).send({'mongoose': 'handle mongoose erro rin next lecture1'});
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
                return res.status(422).send({'mongoose': err});
            }
            return res.json({'registered': true});
        });

    });


    // res.json({username, email});
}