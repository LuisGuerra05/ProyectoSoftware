const express = require('express');
const cartController = require('../controllers/cartController'); // Importar el controlador del carrito
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Middleware de autenticación

// Rutas del carrito
router.get('/', authenticate, cartController.getCart); // Ruta para obtener el carrito
router.post('/add', authenticate, cartController.addToCart); // Ruta para añadir productos al carrito
router.post('/remove', authenticate, cartController.removeFromCart); // Ruta para eliminar productos del carrito
router.post('/clear', authenticate, cartController.clearCart); // Ruta para vaciar el carrito

module.exports = router;
