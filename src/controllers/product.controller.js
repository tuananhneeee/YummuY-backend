'use strict'
const ProductServices = require('../services/product.service')
const { SuccessResponse } = require('../core/success.response')

class ProductController {
  // get all products
  getAllProducts = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get all products success!',
      metadata: await ProductServices.getAllProducts()
    }).send(res)
  }

  // get product by product id
  getProductByProductId = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get product by product id success!',
      metadata: await ProductServices.getProductByProductId({
        productId: req.params.productId
      })
    }).send(res)
  }

  // get product by category
  getProductByCategory = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get product by category success!',
      metadata: await ProductServices.getProductByCategory({
        categoryId: req.params.categoryId
      })
    }).send(res)
  }

  // add product
  addProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Add product success!',
      metadata: await ProductServices.addProduct({
        productData: req.body
      })
    }).send(res)
  }

  // update product
  updateProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update product success!',
      metadata: await ProductServices.updateProduct({
        productId: req.params.productId,
        bodyUpdate: req.body
      })
    }).send(res)
  }

  // delete product
  deleteProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Delete product success!',
      metadata: await ProductServices.deleteProduct({
        productId: req.params.productId
      })
    }).send(res)
  }
}

module.exports = new ProductController()
