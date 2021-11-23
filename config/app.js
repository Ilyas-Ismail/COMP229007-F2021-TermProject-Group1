// File name: app.js
// Author(s): Muhammad Ilyas "Staz" Sameer Ismail (301168447)
// Date: 11/10/2021 (November 11th, 2021)

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
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
let dbConfig = require('./db');

// connect to the database and return connection.
mongoose.connect(dbConfig.URI, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

// associating variables to route the other js files.
// var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var surveyRouter = require('../routes/surveys');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'ejs');

// static path for Angular files
app.use(express.static(path.join(__dirname, '../client/static/')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../scripts')));

var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

//setup express session
// app.use(session({
//   secret: "SomeSecret",
//   saveUninitialized: false,
//   resave: false
// }));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
// app.use(passport.session());
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/surveys', surveyRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/static/index.html'));
});

// create a User Model Instance
let userModel = require('../models/users');
let User = userModel.userModel;

passport.use(User.createStrategy());
// console.log(typeof User.createStrategy());
// serialize and deserialize the User info 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let errorHandler = require('./error-handler');
app.use(errorHandler);

app.use(function(req, res, next) {
  //next(createError(404));
  res.status(404).json(
    {
      statusCode: 404,
      message: "The endpoint does not exist"
    }
  );
});

module.exports = app;
