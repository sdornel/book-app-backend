const { Router } = require('express')
const userController = require('../controllers/user')
const bookController = require('../controllers/book')
const reviewController = require('../controllers/review')
const passport = require('passport')
const passportJWT = require('passport-jwt');
let JwtStrategy = passportJWT.Strategy;
let ExtractJwt = passportJWT.ExtractJwt;
const config = require('../config/config.json')

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
jwtOptions.secretOrKey = config.secret;


const { User } = require('../models'); // maybe delete

// lets create strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = User.getUserById({ id: jwt_payload.id });
    // let user = getUserById({ id: jwt_payload.id });
    // let user = User.getUserById( jwt_payload._id );
    // let user = User.findOne({ id: jwt_payload.id });
    // let user = getUser({ id: jwt_payload.id });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
// use the strategy
passport.use(strategy);

const router = Router();
// router.use(passport.initialize());

router.get('/', (req, res) => res.send('This is root!'))

router.post('/sign-up', userController.signUp)
router.get('/sign-up', userController.signUp)

router.get('/sign-in', userController.signIn)
router.post('/sign-in', userController.signIn)

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