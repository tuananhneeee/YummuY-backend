'use strict'
const CategoryService = require('../services/category.service')
const { SuccessResponse } = require('../core/success.response')

class CategoryController {
  // get all categories
  getAllCategories = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get all categories success!',
      metadata: await CategoryService.getAllCategories()
    }).send(res)
  }

  // get category by category id
  getCategoryById = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get category by category id success!',
      metadata: await CategoryService.getCategoryById({
        categoryId: req.params.categoryId
      })
    }).send(res)
  }

  // add category
  addCategory = async (req, res, next) => {
    new SuccessResponse({
      message: 'Add category success!',
      metadata: await CategoryService.addCategory({
        categoryData: req.body
      })
    }).send(res)
  }

  // update category
  updateCategory = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update category success!',
      metadata: await CategoryService.updateCategory({
        categoryId: req.params.categoryId,
        bodyUpdate: req.body
      })
    }).send(res)
  }

  // delete category
  deleteCategory = async (req, res, next) => {
    new SuccessResponse({
      message: 'Delete category success!',
      metadata: await CategoryService.deleteCategory({
        categoryId: req.params.categoryId
      })
    }).send(res)
  }
}

module.exports = new CategoryController()
