const { Types } = require('mongoose')
const { addOrderItem } = require('../repositories/orderItem.repo')
const { BadRequestError, MethodFailureError } = require('../core/error.response')
const { isValidObjectId } = require('../utils/index')

class OrderItemService {
  static async addOrderItem({ orderItemData }) {
    if (!orderItemData) {
      throw new BadRequestError('orderItemData is required')
    }

    const { orderId, productId, quantity } = orderItemData
    if (!orderId || !productId || !quantity) {
      throw new BadRequestError('orderId, productId, and quantity are required')
    }
    if (!isValidObjectId(orderId) || !isValidObjectId(productId)) {
      throw new BadRequestError('Invalid orderId or productId')
    }
    const orderItem = await addOrderItem({
      orderItemData: {
        order: new Types.ObjectId(orderId),
        product: new Types.ObjectId(productId),
        quantity
      }
    })
    if (!orderItem) {
      throw new MethodFailureError('Add orderItem failed')
    }
    return orderItem
  }
}

module.exports = OrderItemService
