const mongoose = require('mongoose')

const Product = require('./models/productSchema')

const password = '12345'

const uri = `mongodb+srv://piotrpustul:${password}@mern-app.easrui5.mongodb.net/products_test?retryWrites=true&w=majority`

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to the DB')
  })
  .catch(() => {
    console.log('Connection failed!')
  })

const createProduct = async (req, res, next) => {
  const { name, price } = req.body

  const createdProduct = new Product({
    name: name,
    price: price,
  })

  const result = await createdProduct.save()

  res.json(result)
}

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec()

  res.json(products)
}

exports.createProduct = createProduct
exports.getProducts = getProducts
