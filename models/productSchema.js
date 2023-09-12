const mongoose = require('mongoose')

const { Schema, model } = mongoose

const productSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
})

module.exports = model('Product', productSchema)
