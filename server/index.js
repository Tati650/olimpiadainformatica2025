//.env
require('dotenv').config();

//frameworks
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  credentials: true
  
}));

//database
const pool = require('./config/db');

// nose
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());

// Configuración de sesiones (DEBE IR ANTES de las rutas)
app.use(session({
  secret: process.env.SESSION_SECRET || 'tu_secreto_super_seguro',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Cambia a true en producción con HTTPS
    maxAge: 3600000, // 1 hora
    httpOnly: true,
    sameSite: 'lax'
  }
}));

//rutas:
//importar Rutas
const userRoutes = require('./routes/user');
const paquetesRoutes = require('./routes/paquetes');
const carritoRoutes = require('./routes/carrito')
const PCRoutes = require('./routes/pedidoDeCompras')
const productosRoutes= require('./routes/productos')

//Rutas de la api
app.use('/usuarios', userRoutes);
app.use('/paquetes', paquetesRoutes);
app.use('/carrito',carritoRoutes);
app.use('/PedCompra',PCRoutes)
app.use('/productos',productosRoutes)

// Manejo de errores básico
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});