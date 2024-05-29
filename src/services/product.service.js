const { Types } = require('mongoose')
const {
  getAllProducts,
  getProductByProductId,
  getProductByCategory,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../repositories/product.repo')
const { BadRequestError, NotFoundError, MethodFailureError } = require('../core/error.response')
const { isValidObjectId } = require('../utils/index')

class ProductService {
  static async getAllProducts() {
    return await getAllProducts()
  }

  static async getProductByProductId({ productId }) {
    if (!productId) {
      throw new BadRequestError('productId is required')
    }
    if (!isValidObjectId(productId)) {
      throw new BadRequestError('Invalid productId')
    }
    const product = await getProductByProductId({ productId })
    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product
  }

  static async getProductByCategory({ categoryId }) {
    if (!categoryId) {
      throw new BadRequestError('categoryId is required')
    }
    if (!isValidObjectId(categoryId)) {
      throw new BadRequestError('Invalid categoryId')
    }
    const products = await getProductByCategory({ categoryId })
    return products
  }

  static async addProduct({ productData }) {
    if (!productData) {
      throw new BadRequestError('productData is required')
    }

    const { name, price, categoryId, description } = productData
    if (!name || !price || !categoryId || !description) {
      throw new BadRequestError('name, price, categoryId, and description are required')
    }
    if (!isValidObjectId(categoryId)) {
      throw new BadRequestError('Invalid categoryId')
    }
    const product = await addProduct({
      productData: {
        name,
        price,
        category: new Types.ObjectId(categoryId),
        description
      }
    })
    if (!product) {
      throw new MethodFailureError('Add product failed')
    }
    return product
  }

  static async updateProduct({ productId, bodyUpdate }) {
    if (!productId || !bodyUpdate) {
      throw new BadRequestError('productId and bodyUpdate are required')
    }
    if (!isValidObjectId(productId)) {
      throw new BadRequestError('Invalid productId')
    }
    const product = await updateProduct({ productId, bodyUpdate })
    if (!product) {
      throw new MethodFailureError('Update product failed')
    }
    return product
  }

  static async deleteProduct({ productId }) {
    if (!productId) {
      throw new BadRequestError('productId is required')
    }
    if (!isValidObjectId(productId)) {
      throw new BadRequestError('Invalid productId')
    }
    const product = await deleteProduct({ productId })
    if (!product) {
      throw new MethodFailureError('Delete product failed')
    }
    return product
  }
}

module.exports = ProductService
