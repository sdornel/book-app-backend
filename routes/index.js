const { Router } = require('express')
const controllers = require('../controllers')
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))


router.get('/users', controllers.getAllUsers)
router.post('/users', controllers.createUser)

module.exports = router