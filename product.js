const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();

// connect mongodb
mongoose.connect(
  'mongodb://localhost:27017/products', 
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('Connected to mongodb...');
    }
  }
);

// create endpoint
app.get('/products', async(req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get single product
app.get('/products/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// create endpoint
app.post('/products', async(req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update product
app.patch('/products/:id', getProduct, async(req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete product
app.delete('/products/:id', getProduct, async(req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Deleted product' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
