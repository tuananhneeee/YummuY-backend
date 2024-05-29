const { orderItem } = require('../models/orderItem.model')
const { Types } = require('mongoose')

const addOrderItem = async ({ orderItemData }) => {
  return await orderItem.create(orderItemData)
}

module.exports = {
  addOrderItem
}
