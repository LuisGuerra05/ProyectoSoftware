require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const cors = require('cors'); // Habilitar CORS
const db = require('./models/db'); // Conexión a la base de datos
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación
const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuarios

const app = express();

// Middleware
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(cors()); // Habilitar CORS para permitir solicitudes del frontend

// Rutas de autenticación
app.use('/api/auth', authRoutes); // Usar las rutas de autenticación bajo /api/auth

// Rutas de usuarios
app.use('/api', userRoutes); // Usar las rutas de usuarios bajo /api

// Ruta de prueba para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
