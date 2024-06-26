'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

// // check apiKey
// router.use(apiKey)
// // check permission
// router.use(permission('0000'))

router.use('/v1/api/order', require('./order'))
router.use('/v1/api/product', require('./product'))
router.use('/v1/api/category', require('./category'))
router.use('/v1/api/promoItem', require('./promoItem'))
router.use('/v1/api/upload', require('./upload'))
router.use('/v1/api', require('./access'))

module.exports = router
