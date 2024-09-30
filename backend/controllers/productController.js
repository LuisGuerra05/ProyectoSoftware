const db = require('../models/db');

// Obtener todos los productos
const getAllProducts = (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error obteniendo productos:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    res.json(results);
  });
};

// Obtener un producto por ID
const getProductById = (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error obteniendo producto:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result[0]);
  });
};

module.exports = { getAllProducts, getProductById };
