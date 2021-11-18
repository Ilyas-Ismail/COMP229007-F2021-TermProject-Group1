let passport = require('passport');
let flash = require('connect-flash');
let bcrypt = require('bcrypt');

// Create the user model instance
let userModel = require('../models/users');
var Users = userModel.userModel;

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in.
    if(!req.user)
    {
        res.render('auth/signin', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           username: req.user ? req.user.username : '' 
        })
    }
    // send to survey list if they are logged in.
    else
    {
        return res.redirect('/surveys/list');
    }
}

module.exports.processLoginPage = passport.authenticate('local', {
    successRedirect: '/surveys/list',
    failureRedirect: '/auth/signin'
});

module.exports.displayRegisterPage = (req, res, next) => {
    // create a new survey object
    let newUser = Users();

    // display the add view
    res.render('auth/register', { 
        title: 'Register',
        user: newUser 
    });     

}

// Handles the processing of adding a survey

module.exports.processRegisterPage = async (req, res, next) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
    let newUser = Users({
        _id: req.body.id,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    });

    // Insert a new survey into DB
    Users.create(newUser, (err, user) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // redirect
            res.redirect('/surveys/list');
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}