'use strict'

const { Schema, model } = require('mongoose')
const DOCUMENT_NAME = 'PromoItem'
const COLLECTION_NAME = 'PromoItems'

const PromoItemSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

module.exports = {
  promoItem: model(DOCUMENT_NAME, PromoItemSchema)
}
