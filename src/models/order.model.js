'use strict'

const { Schema, model } = require('mongoose')
const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    totalPrice: Number,
    status: String,
    createdAtTime: Date,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

module.exports = {
  order: model(DOCUMENT_NAME, OrderSchema)
}
