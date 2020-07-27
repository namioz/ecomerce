const express = require('express')
const router = express.Router()

const {create, categoryById, read, update, remove, list} = require('../controllers/category')

const {requerSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')

router.get("/category/:categoryId", read)
router.post("/category/create/:userId",requerSignin ,isAuth , isAdmin ,create)
router.put("/category/:categoryId/:userId",requerSignin ,isAuth , isAdmin ,update)
router.delete("/category/:categoryId/:userId",requerSignin ,isAuth , isAdmin ,remove)
router.get("/categories", list)

router.param('categoryId',categoryById )
router.param('userId',userById)


module.exports = router;