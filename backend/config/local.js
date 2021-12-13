const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const config = require("./config");
let bcrypt = require('bcrypt');
let userModel = require('../models/users');
let User = userModel.userModel;

module.exports = function () {

passport.use(
    new JWTstrategy(
        {
            secretOrKey: config.secret,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                console.log(token);
                return done(null, token.payload);
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, async (username, password, done) => {
        User.findOne({ username: username, }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, { message: 'Incorrect Username' });

            bcrypt.compare(password, user.password, function (err, res) {
                if (err) return done(err);
                if (res === false) return done(null, false, { message: 'Incorrect Password' });

                return done(null, user);

            });
        });
    }));
};