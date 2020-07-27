const express = require('express')
const router = express.Router()

const {signup,signin, signout, requerSignin} = require('../controllers/auth')
const {userSignupValidator} = require('../validator/index')

// router.get('/',(req , res) => {
//     res.send("helle from node hay");
// })
router.post('/signup', userSignupValidator,signup);
router.post('/signin', signin);
router.get('/signout', signout);

// router.get('/hello',requerSignin ,(req, res)=> {
//     res.send("hello there");
// })
module.exports = router;