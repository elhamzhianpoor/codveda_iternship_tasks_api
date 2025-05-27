const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3000;
const path = require('path');


app.use('/public',express.static(path.join(__dirname, 'public')));
// Middleware to parse JSON
app.use(express.json());
// Log all requests
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// Import and use product routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Codveda API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});