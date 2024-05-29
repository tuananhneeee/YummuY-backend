'use strict'

const { Schema, model } = require('mongoose')
const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'Categories'

const CategorySchema = new Schema(
  {
    name: String,
    image: String,
    color: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

module.exports = {
  category: model(DOCUMENT_NAME, CategorySchema)
}
