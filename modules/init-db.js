const Station = require('../models/station');

//import configuration
const { mongoUri } = require('./config');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function(){
    console.log('Connected to "basic-mern-app" database.')
});

Station.loadFromMTAFile();

//Station.tryHashTable();

module.exports = db;


/*
    
    **mongodb shell commands**

    -- get server status
    sudo systemctl status mongod

    -- start server
    sudo systemctl start mongod

    -- stop server
    sudo systemctl stop mongod

    -- restart server
    sudo systemctl restart mongod

    -- set for auto restart after boot
    sudo systemctl enable mongod


*/