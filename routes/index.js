const { Router } = require('express')
const { User, Review } = require('../models');
const userController = require('../controllers/user')
const bookController = require('../controllers/book')
const reviewController = require('../controllers/review')
// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
// bcrypt hashes passwords
const config = require('../config/config.json')

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secret;
// jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
// let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
  console.log('payload received', jwt_payload);

  // let user = userController.getUser(jwt_payload.user.id);
  // let user = userController.getUser({ id: jwt_payload.user.id });
  const user = await User.findOne({ // const user is here as promise was pending if taken from userController
      where: { id: jwt_payload.user.id },
      include: [
          {
              model: Review
          }
      ]
  });
  console.log(user.dataValues)
  if (user) {
    next(null, user);
    
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
const router = Router();
// const router = express.Router();

router.get('/', (req, res) => res.send('This is root!'))

router.post('/register', userController.register)
router.post('/login', userController.login)

// router.get('/register', passport.authenticate('jwt', {session: false}), userController.register)
// router.get('/login', passport.authenticate('jwt', {session: false}), userController.login)

// protected route
router.get('/protected/', passport.authenticate('jwt', { session: false }), function(req, res) {
  // let test = userController.getUser
  // console.log("TEST", test)
  // router.get('/users/:id', userController.getUserById())
  res.json({ user: req.user, msg: 'Congrats! You are seeing this because you are authorized'}); // not working yet
}); // outputs unauthorized

// post '/login', to: 'auth#create'
// post '/company-login', to: 'auth#company_create'

// get '/login', to: 'users#token_authentication'
// get '/company-login', to: 'companies#token_authentication'

router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserById)
// router.put('/users/:id', controllers.updateUser) // you always use patch. should try to figure out why tutorial uses put...
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)
router.post('/users', userController.createUser)

router.get('/reviews', reviewController.getAllReviews)
router.get('/reviews/:id', reviewController.getReviewById)
router.patch('/reviews/:id', reviewController.updateReview)
router.delete('/reviews/:id', reviewController.deleteReview)
router.post('/reviews', reviewController.createReview)

router.get('/books', bookController.getAllBooks)
router.get('/books/:id', bookController.getBookById)
router.patch('/books/:id', bookController.updateBook)
router.delete('/books/:id', bookController.deleteBook)
router.post('/books', bookController.createBook)

module.exports = router
