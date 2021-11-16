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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/surveys', surveyRouter);

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
