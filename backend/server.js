require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const cors = require('cors'); // Habilitar CORS
const db = require('./models/db'); // Conexión a la base de datos
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación
const productRoutes = require('./routes/productRoutes'); // Importar las rutas de productos
const cartRoutes = require('./routes/cartRoutes');



const app = express();

// Middleware
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(cors()); // Habilitar CORS para permitir solicitudes del frontend

// Rutas
app.use('/api/auth', authRoutes); // Usar las rutas de autenticación bajo /api/auth
app.use('/api', productRoutes); // Usar las rutas de productos bajo /api/products
app.use('/api/cart', cartRoutes);// Usar las rutas de carrito de compras /api/cart

// Ruta de prueba para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
