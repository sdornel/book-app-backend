const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()) // use cors

app.use(passport.initialize())
// app.use(passport.session());

app.use(bodyParser.json())

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);




// import passport and passport-jwt modules
const passportJWT = require('passport-jwt');
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
// bcrypt hashes passwords

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

// protected route
// app.get('/api/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
//   res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
// });

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))