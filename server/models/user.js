const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        min: [4, 'too short, min is 4 chars'],
        max:[32, 'too long, max is 32 chars']
    },
    emai:{
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


module.exports = mongoose.model('User', userSchema);