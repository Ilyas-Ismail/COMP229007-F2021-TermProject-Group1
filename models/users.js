// File name: users.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: Nov 11, 2021

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// creating a blueprint for users.

let userModel = mongoose.Schema(
    {
        Username: {
            type: String,
            unique: true,
            required: true,
        },
        Password: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        collection: "users"
    }
);


let options = ({ missingPasswordError: 'Wrong / Missing Password'});

userModel.plugin(passportLocalMongoose, options);

module.exports.userModel = mongoose.model('Users', userModel);