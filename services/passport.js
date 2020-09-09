const passport = require('passport')
config = require('../../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
// might need verifyUser in below line
const {getUserById} = require('../controllers/index')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

// create local strategy

const localOptions = {usernameField: 'email'}

const localOptions = new LocalStrategy(localOptions, (email, password, done) => {
    return verifyUser(email)
    .then((validUser) => {
        bcrypt.compare(password, validUser.password)
        .then((validPassword) => {
            if(validPassword) {
                return done(null, validUser)
            }
            return done(null, false)
        })
        .catch(err => done(err, false))
    })
})