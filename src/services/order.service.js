const { Types } = require('mongoose')
const {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  addOrder,
  updateOrder,
  deleteOrder
} = require('../repositories/order.repo')
const { addOrderItem, getAllOrdersItemByOrderId } = require('../services/orderItem.service')
const { BadRequestError, NotFoundError, MethodFailureError } = require('../core/error.response')
const { isValidObjectId, removeUndefinedObject } = require('../utils/index')
const { getProductByProductId } = require('../services/product.service')

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

    const { orderItems } = orderData
    if (!orderItems) {
      throw new BadRequestError('orderItems are required')
    }
    let totalPrice = 0
    for (const orderItem of orderItems) {
      let productId = orderItem.productId
      let product = await getProductByProductId({productId})
      let price = product.price
      totalPrice += price
    } 
    const order = await addOrder({ orderData: {
      status: "waiting", 
      user: new Types.ObjectId(userId),
      totalPrice, 
      createdAtTime: new Date()
    } })
    if (!order) {
      throw new MethodFailureError('Add order failed')
    }

    for (const orderItem of orderItems) {
      await addOrderItem({
        orderItemData: {
          orderId: order._id.toString(),
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          table: orderItem.table
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

    const objectParams = removeUndefinedObject(bodyUpdate)
    if (Object.keys(objectParams).length === 0) {
      throw new BadRequestError('Body update is empty')
    }

    const order = await updateOrder({ orderId, bodyUpdate: objectParams })
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
