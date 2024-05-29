const { Types } = require('mongoose')
const {
  getAllPromoItems,
  getPromoItemById,
  addPromoItem,
  updatePromoItem,
  deletePromoItem
} = require('../repositories/promoItem.repo')
const { BadRequestError, NotFoundError, MethodFailureError } = require('../core/error.response')
const { isValidObjectId, removeUndefinedObject } = require('../utils/index')

class PromoItemService {
  static async getAllPromoItems() {
    return await getAllPromoItems()
  }

  static async getPromoItemById({ promoId }) {
    if (!promoId) {
      throw new BadRequestError('promoId is required')
    }
    if (!isValidObjectId(promoId)) {
      throw new BadRequestError('Invalid promoId')
    }
    const promoItem = await getPromoItemById({ promoId })
    if (!promoItem) {
      throw new NotFoundError('Promo item not found')
    }
    return promoItem
  }

  static async addPromoItem({ promoData }) {
    if (!promoData) {
      throw new BadRequestError('promoData is required')
    }

    const { code, discount, description } = promoData
    if (!code || !discount || !description) {
      throw new BadRequestError('code, discount, and description are required')
    }
    const promoItem = await addPromoItem({ promoData })
    if (!promoItem) {
      throw new MethodFailureError('Add promo item failed')
    }
    return promoItem
  }

  static async updatePromoItem({ promoId, bodyUpdate }) {
    if (!promoId) {
      throw new BadRequestError('promoId is required')
    }
    if (!isValidObjectId(promoId)) {
      throw new BadRequestError('Invalid promoId')
    }
    if (!bodyUpdate) {
      throw new BadRequestError('bodyUpdate is required')
    }

    const objectParams = removeUndefinedObject(bodyUpdate)
    if (Object.keys(objectParams).length === 0) {
      throw new BadRequestError('Body update is empty')
    }

    const promoItem = await updatePromoItem({ promoId, bodyUpdate: objectParams })
    if (!promoItem) {
      throw new MethodFailureError('Update promo item failed')
    }
    return promoItem
  }

  static async deletePromoItem({ promoId }) {
    if (!promoId) {
      throw new BadRequestError('promoId is required')
    }
    if (!isValidObjectId(promoId)) {
      throw new BadRequestError('Invalid promoId')
    }
    const promoItem = await deletePromoItem({ promoId })
    if (!promoItem) {
      throw new MethodFailureError('Delete promo item failed')
    }
    return promoItem
  }
}

module.exports = PromoItemService
