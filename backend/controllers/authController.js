const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db'); // Asegúrate de que tengas la conexión a la base de datos configurada

// Registro de usuario
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos' });
  }

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error verificando el email:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Este email ya está registrado' });
    }

    try {
      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el nuevo usuario
      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error insertando usuario:', err);
          return res.status(500).json({ message: 'Error en el servidor al insertar el usuario' });
        }

        res.status(201).json({ message: `¡Bienvenido, ${name}!` });
      });
    } catch (err) {
      console.error('Error cifrando la contraseña:', err);
      res.status(500).json({ message: 'Error al cifrar la contraseña' });
    }
  });
};

// Login de usuario
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, ingresa todos los campos' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error buscando usuario:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const user = results[0];

    // Verificar la contraseña usando bcrypt
    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Email o contraseña incorrectos' });
      }

      // Generar el token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
    } catch (err) {
      console.error('Error verificando la contraseña:', err);
      return res.status(500).json({ message: 'Error en el servidor al verificar la contraseña' });
    }
  });
};

module.exports = { register, login };
