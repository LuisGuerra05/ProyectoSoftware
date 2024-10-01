const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Aquí se está cargando el middleware de autenticación

// Rutas del carrito
router.get('/', authenticate, cartController.getCart); // Protegido por autenticación
router.post('/add', authenticate, cartController.addToCart); // Protegido por autenticación
router.post('/remove', authenticate, cartController.removeFromCart); // Protegido por autenticación
router.post('/clear', authenticate, cartController.clearCart); // Protegido por autenticación

module.exports = router;
