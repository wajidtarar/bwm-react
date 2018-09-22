const express = require('express');

const mongoose = require('mongoose');
const config = require('./config/dev');
mongoose.connect(config.DB_URI);

const app = express();

app.get('/rentals', function(req, res){
    res.json({'succss': true});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function (){
    console.log('Server is running....');
});