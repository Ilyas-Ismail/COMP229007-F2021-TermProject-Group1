let passport = require('passport');
let flash = require('connect-flash');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/config');


// Create the user model instance
let userModel = require('../models/users');
var Users = userModel.userModel;

function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }
  
    return message;
  };

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
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        displayName: req.body.displayName
    });

    newUser.provider = 'local';

    // Insert a new survey into DB
    Users.create(newUser, (err, user) => {
        if (err) {
            console.log(err);
            let message = getErrorMessage(err);
            return res.json({ success: false, message: message });
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
              const token = jwt.sign({ payload: payload }, config.secret,
                {expiresIn: 1800});
  
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