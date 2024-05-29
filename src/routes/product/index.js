'use strict'
const express = require('express')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2, isAdmin } = require('../../auth/authUtils')

const router = express.Router()

router.get('/', asyncHandler(productController.getAllProducts))
router.get('/:productId', asyncHandler(productController.getProductByProductId))
router.get('/category/:categoryId', asyncHandler(productController.getProductByCategory))

// Authentication
router.use(authenticationV2)
//////////
router.post('/', isAdmin, asyncHandler(productController.addProduct))
router.patch('/:productId', isAdmin, asyncHandler(productController.updateProduct))
router.delete('/:productId', isAdmin, asyncHandler(productController.deleteProduct))

module.exports = router
