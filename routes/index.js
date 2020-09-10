const { Router } = require('express')
const controllers = require('../controllers')
const router = Router();

const passport = require('passport')
const requireSignIn = passport.authenticate('jwt', {session: false})

router.get('/', (req, res) => res.send('This is root!'))

// router.get('/sign-up', (req, res) => {
//     // res.render('authentication/sign-up')
// })

router.post('/sign-up', controllers.signUp)
router.get('/sign-in', controllers.signIn)

// router.get('/sign-in', (req, res) => {
    // var json_data = {"name":"amita","pass":"12345"};
    // res.send(json_data)
    // res.render('authentication/sign-in')
// })

router.post('sign-in', requireSignIn, controllers.signIn)


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
router.post('/reviews', controllers.updateReview)

router.get('/books', controllers.getAllBooks)
router.get('/books/:id', controllers.getBookById)
router.patch('/books/:id', controllers.updateBook)
router.delete('/books/:id', controllers.deleteBook)
router.post('/books', controllers.updateBook)


module.exports = router