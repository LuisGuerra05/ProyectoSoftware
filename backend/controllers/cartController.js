const Cart = require('../models/cartModel'); // Importar el modelo del carrito
const db = require('../models/db'); // Importar la conexión a la base de datos

// Obtener el carrito del usuario
exports.getCart = (req, res) => {
  const userId = req.user.id; // Obtener el ID del usuario autenticado
  Cart.getCartByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener el carrito' });
    res.json(results);
  });
};

// Añadir un producto al carrito
exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { productId, size, quantity } = req.body; // Asegúrate de recibir la talla

  // Comprobar que el producto exista
  const sqlCheckProduct = 'SELECT * FROM products WHERE id = ?';
  db.query(sqlCheckProduct, [productId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al buscar el producto' });
    if (results.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });

    // Añadir el producto al carrito con la talla
    Cart.addItemToCart(userId, productId, size, quantity, (err) => {
      if (err) return res.status(500).json({ message: 'Error al añadir al carrito' });
      res.json({ message: 'Producto añadido al carrito' });
    });
  });
};

// Eliminar un producto del carrito
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
