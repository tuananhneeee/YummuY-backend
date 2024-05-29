'use strict'

const { Schema, model } = require('mongoose')
const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const ProductSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

module.exports = {
  product: model(DOCUMENT_NAME, ProductSchema)
}
