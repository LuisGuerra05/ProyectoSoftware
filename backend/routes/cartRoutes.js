const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Asegúrate de que el usuario esté autenticado

// Rutas del carrito
router.get('/', authenticate, cartController.getCart);
router.post('/add', authenticate, cartController.addToCart);
router.post('/remove', authenticate, cartController.removeFromCart);
router.post('/clear', authenticate, cartController.clearCart);

module.exports = router;
