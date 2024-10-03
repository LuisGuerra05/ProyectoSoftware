const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no válido.' });
  }

  const token = authHeader.split(' ')[1]; // Extrae el token eliminando el prefijo 'Bearer'
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Permite que la solicitud continúe
  } catch (error) {
    return res.status(403).json({ message: 'Token no válido.' });
  }
};

module.exports = authenticate;
