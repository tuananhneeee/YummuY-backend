const { product } = require('../models/product.model')
const { Types } = require('mongoose')

const getAllProducts = async () => {
  return await product.find({ isDeleted: false }).exec()
}

const getProductByProductId = async ({ productId }) => {
  return await product.findOne({ _id: new Types.ObjectId(productId) }).exec()
}

const getProductByCategory = async ({ categoryId }) => {
  return await product.find({ category: new Types.ObjectId(categoryId) }).exec()
}

const addProduct = async ({ productData }) => {
  return await product.create(productData)
}

const updateProduct = async ({ productId, bodyUpdate }) => {
  return await product.findByIdAndUpdate(productId, bodyUpdate, { new: true }).exec()
}

const deleteProduct = async ({ productId }) => {
  return await product.findByIdAndUpdate(productId, { isDeleted: true, deletedAt: new Date() }).exec()
}

module.exports = {
  getAllProducts,
  getProductByProductId,
  getProductByCategory,
  addProduct,
  updateProduct,
  deleteProduct
}
