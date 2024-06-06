'use strict'

const { Schema, model } = require('mongoose')
const DOCUMENT_NAME = 'OrderItem'
const COLLECTION_NAME = 'OrderItems'

const OrderItemSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Date,
    table: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

module.exports = {
  orderItem: model(DOCUMENT_NAME, OrderItemSchema)
}
