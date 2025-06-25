//.env
require('dotenv').config();

//frameworks
const express = require('express');
const app = express();

//database
const pool = require('./config/db');

// nose
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());

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