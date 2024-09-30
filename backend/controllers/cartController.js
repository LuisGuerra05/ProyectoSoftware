const Cart = require('../models/cartModel');

// Obtener carrito del usuario
exports.getCart = (req, res) => {
  const userId = req.user.id; // Asume que tienes autenticación y puedes obtener el ID del usuario
  Cart.getCartByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener el carrito' });
    res.json(results);
  });
};

// Añadir producto al carrito
exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  Cart.addItemToCart(userId, productId, quantity, (err) => {
    if (err) return res.status(500).json({ message: 'Error al añadir al carrito' });
    res.json({ message: 'Producto añadido al carrito' });
  });
};

// Eliminar producto del carrito
exports.removeFromCart = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  Cart.removeItemFromCart(userId, productId, (err) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar del carrito' });
    res.json({ message: 'Producto eliminado del carrito' });
  });
};

// Vaciar el carrito
exports.clearCart = (req, res) => {
  const userId = req.user.id;
  Cart.clearCart(userId, (err) => {
    if (err) return res.status(500).json({ message: 'Error al vaciar el carrito' });
    res.json({ message: 'Carrito vaciado' });
  });
};
