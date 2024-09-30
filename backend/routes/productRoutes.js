const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/productController');
const router = express.Router();

// Rutas para productos
router.get('/products', getAllProducts); // Obtener todos los productos
router.get('/products/:id', getProductById); // Obtener un producto por su ID

module.exports = router;
