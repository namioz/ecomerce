const express = require('express')
const router = express.Router()

const {requerSignin, isAuth} = require('../controllers/auth')

const {userById} = require('../controllers/user')
const {generateToken, processPayment} = require('../controllers/braintree')


router.get('/braintree/getToken/:userId', requerSignin, isAuth, generateToken)
router.post('/braintree/payment/:userId', requerSignin, isAuth, processPayment)


router.param('userId',userById)

module.exports = router;