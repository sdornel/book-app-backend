// const jwt = require('jwt-simple')
// const config = require('../../config')
// const {createUser} = require('./index')
// const bcrypt = require('bcrypt')

// const tokenForUser = (user) => {
//     const timestamp = new Date().getTime()
//     return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
// }

// const signIn = (req, res, next) => {
//     res.send({ token: tokenForUser(req.user) })
// }

// const signUp = (req, res, next) => {

//     const {name, email, password} = req.body
//     const saltRounds = 12

//     if(!email || !password) {
//         res.status(422).send({error: 'You must provide both an email and password'})
//     }
//     // see if user exists with given email address
//     bcrypt.hash(password, saltRounds)
//     .then((hash) => {
//         const body = {name, email, hash}
//         // return createUser(name, email, hash)
//         return createUser(body)
//         .then((newUser) => {
//             res.json({token: tokenForUser(newUser) })
//         })
//         .catch((err) => {
//             res.json({error: 'Error saving user to database'})
//         })
//     })
//     .catch((err) => {
//         return next(err)
//     })
// }  

// module.exports = {
//     signUp,
//     signIn
// }