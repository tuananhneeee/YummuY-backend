'use strict'
const express = require('express')
const categoryController = require('../../controllers/category.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2, isAdmin } = require('../../auth/authUtils')

const router = express.Router()

router.get('/', asyncHandler(categoryController.getAllCategories))
router.get('/:categoryId', asyncHandler(categoryController.getCategoryById))

// Authentication
router.use(authenticationV2)
//////////

router.post('/', isAdmin, asyncHandler(categoryController.addCategory))
router.patch('/:categoryId', isAdmin, asyncHandler(categoryController.updateCategory))
router.delete('/:categoryId', isAdmin, asyncHandler(categoryController.deleteCategory))

module.exports = router
