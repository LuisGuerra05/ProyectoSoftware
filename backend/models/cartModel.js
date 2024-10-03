const db = require('./db'); // Conexión a la base de datos

const Cart = {
  getCartByUserId: (userId, callback) => {
    const sql = `
      SELECT ci.product_id, ci.quantity, ci.size, p.name, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      JOIN carts c ON ci.cart_id = c.id
      WHERE c.user_id = ?
    `;
    db.query(sql, [userId], callback);
  },

  addItemToCart: (userId, productId, size, quantity, callback) => {
    // Comprobar si ya existe un carrito para el usuario
    const sqlCheckCart = 'SELECT id FROM carts WHERE user_id = ?';
    db.query(sqlCheckCart, [userId], (err, results) => {
      if (err) return callback(err);

      let cartId = null;

      if (results.length > 0) {
        // Si el carrito ya existe, usar su ID
        cartId = results[0].id;
      } else {
        // Si no, crear un nuevo carrito
        const sqlCreateCart = 'INSERT INTO carts (user_id) VALUES (?)';
        db.query(sqlCreateCart, [userId], (err, results) => {
          if (err) return callback(err);
          cartId = results.insertId;
        });
      }

      // Finalmente, agregar el producto al carrito, incluyendo la talla (size)
      const sqlInsertItem = `
        INSERT INTO cart_items (cart_id, product_id, size, quantity)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
      `;
      db.query(sqlInsertItem, [cartId, productId, size, quantity], callback);
    });
  },

  removeItemFromCart: (userId, productId, callback) => {
    const sql = `
      DELETE ci FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.id
      WHERE c.user_id = ? AND ci.product_id = ?
    `;
    db.query(sql, [userId, productId], callback);
  },

  clearCart: (userId, callback) => {
    const sql = `
      DELETE ci FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.id
      WHERE c.user_id = ?
    `;
    db.query(sql, [userId], callback);
  }
};

module.exports = Cart;
