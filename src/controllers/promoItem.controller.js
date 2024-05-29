'use strict'
const PromoItemService = require('../services/promoItem.service')
const { SuccessResponse } = require('../core/success.response')

class PromoItemController {
  // get all promo items
  getAllPromoItems = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get all promo items success!',
      metadata: await PromoItemService.getAllPromoItems()
    }).send(res)
  }

  // get promo item by promo id
  getPromoItemById = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get promo item by promo id success!',
      metadata: await PromoItemService.getPromoItemById({
        promoId: req.params.promoId
      })
    }).send(res)
  }

  // add promo item
  addPromoItem = async (req, res, next) => {
    new SuccessResponse({
      message: 'Add promo item success!',
      metadata: await PromoItemService.addPromoItem({
        promoData: req.body
      })
    }).send(res)
  }

  // update promo item
  updatePromoItem = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update promo item success!',
      metadata: await PromoItemService.updatePromoItem({
        promoId: req.params.promoId,
        bodyUpdate: req.body
      })
    }).send(res)
  }

  // delete promo item
  deletePromoItem = async (req, res, next) => {
    new SuccessResponse({
      message: 'Delete promo item success!',
      metadata: await PromoItemService.deletePromoItem({
        promoId: req.params.promoId
      })
    }).send(res)
  }
}

module.exports = new PromoItemController()
