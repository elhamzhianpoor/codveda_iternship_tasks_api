const express = require('express');
const router = express.Router();
let products = require('../data/products');

// Generate next unique ID
function getNextId() {
  return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST create a new product
router.post('/', (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null)
    return res.status(400).json({ message: 'Missing required fields' });

  const newProduct = {
    id: getNextId(),
    name,
    price: Number(price),
    stock: Number(stock)
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update an existing product
router.put('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null)
    return res.status(400).json({ message: 'Missing required fields' });

  products[productIndex] = {
    ...products[productIndex],
    name,
    price: Number(price),
    stock: Number(stock)
  };

  res.json(products[productIndex]);
});

// DELETE a product
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(productIndex, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

// PATCH increase stock
router.patch('/:id/increase', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.stock += 1;
  res.json(product);
});

// PATCH decrease stock
router.patch('/:id/decrease', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.stock <= 0) return res.status(400).json({ message: 'Stock cannot be negative' });

  product.stock -= 1;
  res.json(product);
});

module.exports = router;