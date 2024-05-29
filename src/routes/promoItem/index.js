'use strict'
const express = require('express')
const promoItemController = require('../../controllers/promoItem.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2, isAdmin } = require('../../auth/authUtils')

const router = express.Router()

router.get('/', asyncHandler(promoItemController.getAllPromoItems))
router.get('/:promoItemId', asyncHandler(promoItemController.getPromoItemById))

// Authentication
router.use(authenticationV2)
//////////

router.post('/', isAdmin, asyncHandler(promoItemController.addPromoItem))
router.patch('/:promoItemId', isAdmin, asyncHandler(promoItemController.updatePromoItem))
router.delete('/:promoItemId', isAdmin, asyncHandler(promoItemController.deletePromoItem))

module.exports = router
