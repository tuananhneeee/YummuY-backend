const { Types } = require('mongoose')
const {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  addOrder,
  updateOrder,
  deleteOrder
} = require('../repositories/order.repo')
const { addOrderItem } = require('../services/orderItem.service')
const { BadRequestError, NotFoundError, MethodFailureError } = require('../core/error.response')
const { isValidObjectId } = require('../utils/index')

class OrderService {
  static async getAllOrders() {
    return await getAllOrders()
  }

  static async getOrderById({ orderId }) {
    if (!orderId) {
      throw new BadRequestError('orderId is required')
    }
    if (!isValidObjectId(orderId)) {
      throw new BadRequestError('Invalid orderId')
    }
    const order = await getOrderById({ orderId })
    const orderItems = await getAllOrdersItemByOrderId({ orderId })
    if (!order) {
      throw new NotFoundError('Order not found')
    }
    return {
      order,
      orderItems
    }
  }

  static async getOrderByUserId({ userId }) {
    if (!userId) {
      throw new BadRequestError('userId is required')
    }
    if (!isValidObjectId(userId)) {
      throw new BadRequestError('Invalid userId')
    }
    const orders = await getOrderByUserId({ userId })
    const ordersWithItems = []
    for (const order of orders) {
      const orderItems = await getAllOrdersItemByOrderId({ orderId: order._id.toString() })
      ordersWithItems.push({
        order,
        orderItems
      })
    } 
    return ordersWithItems
  }

  static async addOrder({ orderData, userId }) {
    if (!userId) {
      throw new BadRequestError('userId is required')
    }
    if (!isValidObjectId(userId)) {
      throw new BadRequestError('Invalid userId')
    }
    if (!orderData) {
      throw new BadRequestError('orderData is required')
    }

    const { orderItems, totalPrice, createdAtTime } = orderData
    if (!orderItems || !totalPrice || !createdAtTime) {
      throw new BadRequestError('orderItems, totalPrice, and createdAtTime are required')
    }
    orderData.user = new Types.ObjectId(userId)
    const order = await addOrder({ orderData })
    if (!order) {
      throw new MethodFailureError('Add order failed')
    }

    for (const orderItem of orderItems) {
      await addOrderItem({
        orderItemData: {
          orderId: order._id.toString(),
          productId: orderItem.productId,
          quantity: orderItem.quantity
        }
      })
    }

    return order
  }

  static async updateOrder({ orderId, bodyUpdate }) {
    if (!orderId || !bodyUpdate) {
      throw new BadRequestError('orderId and bodyUpdate are required')
    }
    if (!isValidObjectId(orderId)) {
      throw new BadRequestError('Invalid orderId')
    }
    const order = await updateOrder({ orderId, bodyUpdate })
    if (!order) {
      throw new MethodFailureError('Update order failed')
    }
    return order
  }

  static async deleteOrder({ orderId }) {
    if (!orderId) {
      throw new BadRequestError('orderId is required')
    }
    if (!isValidObjectId(orderId)) {
      throw new BadRequestError('Invalid orderId')
    }
    const order = await deleteOrder({ orderId })
    if (!order) {
      throw new MethodFailureError('Delete order failed')
    }
    return order
  }
}

module.exports = OrderService
