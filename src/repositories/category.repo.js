const { category } = require('../models/category.model')
const { Types } = require('mongoose')

const getAllCategories = async () => {
  return await category.find({ isDeleted: false }).exec()
}

const getCategoryById = async ({ categoryId }) => {
  return await category.findOne({ _id: new Types.ObjectId(categoryId) }).exec()
}

const addCategory = async ({ categoryData }) => {
  return await category.create(categoryData)
}

const updateCategory = async ({ categoryId, bodyUpdate }) => {
  return await category.findByIdAndUpdate(categoryId, bodyUpdate, { new: true }).exec()
}

const deleteCategory = async ({ categoryId }) => {
  return await category.findByIdAndUpdate(categoryId, { isDeleted: true, deletedAt: new Date() }).exec()
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
}
