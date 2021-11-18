// File name: app.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: 11/10/2021 (November 11th, 2021)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let session = require('express-session');
let passport = require('passport');

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let bcrypt = require('bcrypt');

// setting up the database.
let mongoose = require('mongoose');
let dbURI = require('./db');

// connect to the database and return connection.
mongoose.connect(dbURI.URI, {useNewUrlParser: true, useUnifiedTopology: true});
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

// associating variables to route the other js files.
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var surveyRouter = require('../routes/surveys');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../scripts')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/surveys', surveyRouter);

app.use(session({
  secret: "SomeSecret",
  saveUninitialized: true,
  resave: false
}));

// create a User Model Instance
let userModel = require('../models/users');
let User = userModel.userModel;

// serialize and deserialize the User info 
passport.serializeUser(function (user, done) { 
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user){
    done(err, user);
  });
  });

  // creating the strategy.

  passport.use(new localStrategy(function (username, password, done) {
    User.findOne({ username: username,}, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect Username'});

      bcrypt.compare(password, user.password, function (err, res) {
        if (err) return done(err);
        if (res === false) return done(null, false, {message: 'Incorrect Password'});

        return done(null, user);
      });
    });
  }));

  app.get('/register', async (req, res) => {
    let exists = await User.exists({ username: "test" });

    if (exists) {
      res.redirect('/login');
      return;
    };

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash("pass", salt, function (err, hash) {
        if (err) return next(err);

        let newAdmin = new User({
          username: "test",
          email: "test@test.com",
          password: hash
        });

        newAdmin.save();

        res.redirect('/login');
      })
    })
  })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
