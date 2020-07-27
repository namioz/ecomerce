const express = require('express')
const router = express.Router();


const {requerSignin, isAuth, isAdmin} = require('../controllers/auth')


const {userById, read, update, purchaseHistory} = require('../controllers/user')

router.get('/secret/:userId',requerSignin,isAuth, isAdmin, (req, res) => {
    res.json({
       user: req.profile 
    })
})

router.get('/user/:userId', requerSignin,isAuth, read)
router.put('/user/:userId', requerSignin,isAuth, update)
router.get('/orders/by/user/:userId', requerSignin,isAuth, purchaseHistory)


// any time we have userid we run this middleware (userById)
// make the user information available
router.param('userId',userById)

module.exports = router;