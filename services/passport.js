const passport = require('passport')
config = require('../../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
// might need verifyUser in below line
const {getUserById} = require('../controllers/index')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')