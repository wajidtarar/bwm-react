
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        min: [4, 'too short, min is 4 chars'],
        max:[32, 'too long, max is 32 chars']
    },
    email:{
        type: String,
        min: [4, 'too short, min is 4 chars'],
        max:[32, 'too long, max is 32 chars'],
        unique: true,
        lowercase: true,
        required: 'email is always required',
        match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/]
    },
    password:{
        type: String,
        min: [4, 'too short, min is 4 chars'],
        max:[32, 'too long, max is 32 chars'],
        required: 'password is always required',

    },
    rentals:[{type: Schema.Types.ObjectId, ref:'Rental'}]
});

userSchema.methods.isSamePassword = function(givenPassword){
    let hasSamepwd = bcrypt.compareSync(givenPassword, this.password);
    // let hasSamepwd = true;
    return hasSamepwd;
}

userSchema.pre('save', function(next){
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);