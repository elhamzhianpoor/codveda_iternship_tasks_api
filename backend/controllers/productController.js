const products = require('../data/Products');
const { generateUniqueId } = require('../utils/generateId');

let productList = [...products];

// GET all products
const getAllProducts = (req, res) => {
  res.json(productList);
};

// GET product by ID
const getProductById = (req, res) => {
  const product = productList.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};


// POST create a new product
const createProduct = (req, res) => {
  const { name, price ,stock} = req.body;
  const newProduct = {
    id: generateUniqueId(productList),
    name,
    price,
    stock
  };
  productList.push(newProduct);
  res.status(201).json(newProduct);
};


// PUT update an existing product
const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = productList.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const updatedProduct = {
    ...productList[index],
    ...req.body,
    id, // حفظ id اصلی
  };

  productList[index] = updatedProduct;
  res.json(updatedProduct);
};


// DELETE a product
const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = productList.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  productList.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
};
// Increase product stock by a given amount
const increaseStock = (req, res) => {
  const productId = parseInt(req.params.id);
  const amount = parseInt(req.body.amount);

  // Validate amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount. Must be a positive number." });
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  product.stock += amount;

  res.json({ message: `Stock increased by ${amount}`, product });
};

// Decrease product stock by a given amount
const decreaseStock = (req, res) => {
  const productId = parseInt(req.params.id);
  const amount = parseInt(req.body.amount);

  // Validate amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount. Must be a positive number." });
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  // Check if enough stock available
  if (product.stock < amount) {
    return res.status(400).json({ message: "Insufficient stock to decrease." });
  }

  product.stock -= amount;

  res.json({ message: `Stock decreased by ${amount}`, product });
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
};