//import modules
const express = require('express');
const path = require('path');

//initialize 
const app=express();

//set a static folder
app.use(express.static(__dirname + '/static'));

//define route
app.get('/*', function (req,res) {
    res.sendFile(path.join(__dirname + '/static'));
});

//initialize the server 
app.listen(process.env.PORT || 8080, () => {
    console.log('===> Angular app is running');
});