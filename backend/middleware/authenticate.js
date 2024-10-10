const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extraer el token eliminando el prefijo 'Bearer'
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Permitir que la solicitud continúe
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
