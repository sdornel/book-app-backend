const { Router } = require('express')
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
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = userController.getUser({ id: jwt_payload.id });
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
router.get('/register', userController.register)

router.get('/login', userController.login)
router.post('/login', userController.login)

// protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'}); // not working yet
}); // outputs unauthorized

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
