const { Types } = require('mongoose')

const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../repositories/category.repo')
const { BadRequestError, NotFoundError, MethodFailureError } = require('../core/error.response')
const { isValidObjectId } = require('../utils/index')

class CategoryService {
  static async getAllCategories() {
    return await getAllCategories()
  }

  static async getCategoryById({ categoryId }) {
    if (!categoryId) {
      throw new BadRequestError('categoryId is required')
    }
    if (!isValidObjectId(categoryId)) {
      throw new BadRequestError('Invalid categoryId')
    }
    const category = await getCategoryById({ categoryId })
    if (!category) {
      throw new NotFoundError('Category not found')
    }
    return category
  }

  static async addCategory({ categoryData }) {
    if (!categoryData) {
      throw new BadRequestError('categoryData is required')
    }

    const { name } = categoryData
    if (!name) {
      throw new BadRequestError('name is required')
    }
    const category = await addCategory({ categoryData })
    if (!category) {
      throw new MethodFailureError('Add category failed')
    }
    return category
  }

  static async updateCategory({ categoryId, bodyUpdate }) {
    if (!categoryId) {
      throw new BadRequestError('categoryId is required')
    }
    if (!isValidObjectId(categoryId)) {
      throw new BadRequestError('Invalid categoryId')
    }
    if (!bodyUpdate) {
      throw new BadRequestError('bodyUpdate is required')
    }
    const category = await updateCategory({ categoryId, bodyUpdate })
    if (!category) {
      throw new MethodFailureError('Update category failed')
    }
    return category
  }

  static async deleteCategory({ categoryId }) {
    if (!categoryId) {
      throw new BadRequestError('categoryId is required')
    }
    if (!isValidObjectId(categoryId)) {
      throw new BadRequestError('Invalid categoryId')
    }
    const category = await deleteCategory({ categoryId })
    if (!category) {
      throw new MethodFailureError('Delete category failed')
    }
    return category
  }
}

module.exports = CategoryService
