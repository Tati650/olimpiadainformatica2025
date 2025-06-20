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

//Rutas de la api
app.use('/users', userRoutes);


// Manejo de errores básico
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});