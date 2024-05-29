const { orderItem } = require('../models/orderItem.model')
const { Types } = require('mongoose')

const addOrderItem = async ({ orderItemData }) => {
  return await orderItem.create(orderItemData)
}

const getAllOrdersItemByOrderId = async ({ orderId }) => {
  return await orderItem.find({ order: new Types.ObjectId(orderId) })
    .populate('product')
    .populate('product.category')
    .exec()
}

module.exports = {
  addOrderItem,
  getAllOrdersItemByOrderId
}
