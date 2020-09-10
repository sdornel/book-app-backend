const passport = require('passport')
const config = require('../config/config.json')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
// might need verifyUser in below line
const {getUserById, verifyUser} = require('../controllers/index')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

// create local strategy

const localOptions = {usernameField: 'email'}

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // return verifyUser(email)
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
//setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
}

// create jwt strategy

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    console.log(payload)
    return getUserById(payload.sub)
    .then((foundUser) => {
        if(foundUser){
            return done(null, foundUser)
        }
        return done(null, false)
    })
    .catch(err => done(err, false))
})

// tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)