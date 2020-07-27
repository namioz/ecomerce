const express = require('express')
const router = express.Router()

const {requerSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userById, addOrderToHistory} = require('../controllers/user')
const {create, listOrders, getStatusValues, orderById, updateOrderStatus} = require('../controllers/order')
const {decreaseQuantity} = require('../controllers/product')

router.post('/order/create/:userId', requerSignin, isAuth,addOrderToHistory, decreaseQuantity, create)

router.get('/order/list/:userId', requerSignin, isAuth, isAdmin, listOrders)
router.get('/order/status-values/:userId', requerSignin, isAuth, isAdmin, getStatusValues)
router.put('/order/:orderId/status/:userId', requerSignin, isAuth, isAdmin, updateOrderStatus)

router.param('userId',userById)
router.param('orderId',orderById)

module.exports = router;