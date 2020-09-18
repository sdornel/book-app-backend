const { Router } = require('express')
const controllers = require('../controllers')
const router = Router();

const passport = require('passport')

router.get('/', (req, res) => res.send('This is root!'))

router.post('/sign-up', controllers.signUp)
router.get('/sign-up', controllers.signUp)

router.get('/sign-in', controllers.signIn)
router.post('/sign-in', controllers.signIn)

// protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'}); // not working yet
});

router.get('/users', controllers.getAllUsers)
router.get('/users/:id', controllers.getUserById)
// router.put('/users/:id', controllers.updateUser) // you always use patch. should try to figure out why tutorial uses put...
router.patch('/users/:id', controllers.updateUser)
router.delete('/users/:id', controllers.deleteUser)
router.post('/users', controllers.createUser)

router.get('/reviews', controllers.getAllReviews)
router.get('/reviews/:id', controllers.getReviewById)
router.patch('/reviews/:id', controllers.updateReview)
router.delete('/reviews/:id', controllers.deleteReview)
router.post('/reviews', controllers.createReview)

router.get('/books', controllers.getAllBooks)
router.get('/books/:id', controllers.getBookById)
router.patch('/books/:id', controllers.updateBook)
router.delete('/books/:id', controllers.deleteBook)
router.post('/books', controllers.createBook)


module.exports = router