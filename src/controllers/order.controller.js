'use strict'
const OrderServices = require('../services/order.service')
const { SuccessResponse } = require('../core/success.response')

class OrderController {
  // get all orders
  getAllOrders = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get all orders success!',
      metadata: await OrderServices.getAllOrders()
    }).send(res)
  }

  // get order by order id
  getOrderById = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get order by order id success!',
      metadata: await OrderServices.getOrderById({
        orderId: req.params.orderId
      })
    }).send(res)
  }

  // get order by user id
  getOrderByUserId = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get order by user id success!',
      metadata: await OrderServices.getOrderByUserId({
        userId: req.user.userId
      })
    }).send(res)
  }

  // add order
  addOrder = async (req, res, next) => {
    new SuccessResponse({
      message: 'Add order success!',
      metadata: await OrderServices.addOrder({
        orderData: req.body,
        userId: req.user.userId
      })
    }).send(res)
  }

  // update order
  updateOrder = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update order success!',
      metadata: await OrderServices.updateOrder({
        orderId: req.params.orderId,
        bodyUpdate: req.body
      })
    }).send(res)
  }

  // delete order
  deleteOrder = async (req, res, next) => {
    new SuccessResponse({
      message: 'Delete order success!',
      metadata: await OrderServices.deleteOrder({
        orderId: req.params.orderId
      })
    }).send(res)
  }
}

module.exports = new OrderController()
