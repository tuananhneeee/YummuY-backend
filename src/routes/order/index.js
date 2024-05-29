'use strict'
const express = require('express')
const orderController = require('../../controllers/order.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2, isAdmin } = require('../../auth/authUtils')

const router = express.Router()

router.get('/', asyncHandler(orderController.getAllOrders))
router.get('/:orderId', asyncHandler(orderController.getOrderById))

// Authentication
router.use(authenticationV2)
//////////

router.get('/user', asyncHandler(orderController.getOrderByUserId))
router.post('/', asyncHandler(orderController.addOrder))
router.patch('/:orderId', isAdmin, asyncHandler(orderController.updateOrder))
router.delete('/:orderId', isAdmin, asyncHandler(orderController.deleteOrder))

module.exports = router
