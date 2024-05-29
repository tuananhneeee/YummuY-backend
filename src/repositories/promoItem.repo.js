const { promoItem } = require('../models/promoItem.model')
const { Types } = require('mongoose')

const getAllPromoItems = async () => {
  return await promoItem.find({ isDeleted: false }).exec()
}

const getPromoItemById = async ({ promoItemId }) => {
  return await promoItem.findOne({ _id: new Types.ObjectId(promoItemId) }).exec()
}

const addPromoItem = async ({ promoItemData }) => {
  return await promoItem.create(promoItemData)
}

const updatePromoItem = async ({ promoItemId, bodyUpdate }) => {
  return await promoItem.findByIdAndUpdate(promoItemId, bodyUpdate, { new: true }).exec()
}

const deletePromoItem = async ({ promoItemId }) => {
  return await promoItem.findByIdAndUpdate(promoItemId, { isDeleted: true, deletedAt: new Date() }).exec()
}

module.exports = {
  getAllPromoItems,
  getPromoItemById,
  addPromoItem,
  updatePromoItem,
  deletePromoItem
}
