const { order } = require('../models/order.model')
const { Types } = require('mongoose')

const getAllOrders = async () => {
  return await order.find({ isDeleted: false })
  .populate('user')
  .exec()
}

const getOrderById = async ({ orderId }) => {
  return await order.findOne({ _id: new Types.ObjectId(orderId) })
  .populate('user')
  .exec()
}

const getOrderByUserId = async ({ userId }) => {
  return await order.find({ user: new Types.ObjectId(userId) })
  .populate('user')
  .exec()
}

const addOrder = async ({ orderData }) => {
  return await order.create(orderData)
}

const updateOrder = async ({ orderId, bodyUpdate }) => {
  return await order.findByIdAndUpdate(orderId, bodyUpdate, { new: true }).exec()
}

const deleteOrder = async ({ orderId }) => {
  return await order.findByIdAndUpdate(orderId, { isDeleted: true, deletedAt: new Date() }).exec()
}

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  addOrder,
  updateOrder,
  deleteOrder
}
