const { MongoClient } = require('mongodb')

const password = ''

const uri = `mongodb+srv://piotrpustul:${password}@mern-app.easrui5.mongodb.net/products_test?retryWrites=true&w=majority`

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db()
    const result = await db.collection('products').insertOne(newProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    res
      .status(500)
      .json({ message: 'An error occurred while creating the product' })
  } finally {
    client.close()
  }

  res.json(newProduct)
}

const getProducts = async (req, res, next) => {
  const client = new MongoClient(uri)

  let products

  try {
    await client.connect()
    const db = client.db()
    products = await db.collection('products').find().toArray()
  } catch (error) {
    console.error('Error creating product:', error)
    res
      .status(500)
      .json({ message: 'An error occurred while getting the products' })
  } finally {
    client.close()
  }
  res.json(products)
}

exports.createProduct = createProduct
exports.getProducts = getProducts
