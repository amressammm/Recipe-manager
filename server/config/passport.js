const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const tokenKey = require('./keys').secretOrKey

const User = require('../models/User');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = tokenKey

module.exports = function(passport){
    passport.use('emailLogin',
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Match User
            User.findOne({ email })
            .then(user => {
                if(!user){
                    return done(null, false, {message: 'This email is not registered' })
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err)
                        throw err
                    if(isMatch){
                        return done(null, user)
                    }
                    else{
                        return done(null, false, {message: 'Wrong Password!'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user)
        })
    })
    
    passport.use('userAuth',new JwtStrategy(opts, async (jwtPayload, done) => {
        const currentUser = await User.findById(jwtPayload._id)
        if(currentUser) return done(null,currentUser)
            return done(null,false)
     }))
}