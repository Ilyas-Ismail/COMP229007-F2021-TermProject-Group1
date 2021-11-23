let passport = require('passport');
let flash = require('connect-flash');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/config');


// Create the user model instance
let userModel = require('../models/users');
var Users = userModel.userModel;

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

    newUser.provider = 'local';

    // Insert a new survey into DB
    Users.create(newUser, (err, user) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: err });
        }
        else {
            // redirect
            // res.redirect('/surveys/list');
            return res.status(200).json({ success: true, message: "You have successfully registered!" })
        }
    });
}

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

module.exports.processLoginPage = function (req, res, next) {

    passport.authenticate(
        'login',
    async (err, user, info) => {
        try {
          if (err || !user) {
            console.log(err);
            return res.json({ success: false, message: err || info.message});
          }
  
          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
  
              const payload = { _id: user._id, email: user.email };
              const token = jwt.sign({ payload: payload }, config.secret);
  
              return res.json({ success: true, token: token });
            }
          );
        } catch (error) {
          // return next(error);
          console.log(error);
          return res.json({ success: false, message: error});
        }
      }
    )(req, res, next);
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}