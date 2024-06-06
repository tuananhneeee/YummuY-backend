const { Types } = require('mongoose')
const { addOrderItem, getAllOrdersItemByOrderId } = require('../repositories/orderItem.repo')
const { BadRequestError, MethodFailureError } = require('../core/error.response')
const { isValidObjectId } = require('../utils/index')

class OrderItemService {
  static async getAllOrdersItemByOrderId({ orderId }) {
    if (!orderId) {
      throw new BadRequestError('orderId is required')
    }
    if (!isValidObjectId(orderId)) {
      throw new BadRequestError('Invalid orderId')
    }
    const orderItems = await getAllOrdersItemByOrderId({ orderId })
    return orderItems
  }
  
  static async addOrderItem({ orderItemData }) {
    if (!orderItemData) {
      throw new BadRequestError('orderItemData is required')
    }

    const { orderId, productId, quantity, table } = orderItemData
    if (!orderId || !productId || !quantity || !table) {
      throw new BadRequestError('orderId, productId, table and quantity are required')
    }
    if (!isValidObjectId(orderId) || !isValidObjectId(productId)) {
      throw new BadRequestError('Invalid orderId or productId')
    }
    const orderItem = await addOrderItem({
      orderItemData: {
        order: new Types.ObjectId(orderId),
        product: new Types.ObjectId(productId),
        quantity,
        table
      }
    })
    if (!orderItem) {
      throw new MethodFailureError('Add orderItem failed')
    }
    return orderItem
  }
}

module.exports = OrderItemService
