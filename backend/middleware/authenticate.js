const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener una clave secreta en tu archivo .env
    req.user = decoded; // Almacena la información del usuario decodificado en la solicitud
    next(); // Continua con la siguiente función
  } catch (error) {
    return res.status(400).json({ message: 'Token no válido.' });
  }
};

module.exports = authenticate;
