require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Actualiza la configuración de CORS y sesión:
app.use(cors({
  origin: 'http://localhost:5500', // Usa localhost consistentemente
  credentials: true,
  exposedHeaders: ['set-cookie']

}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'tu-secreto-seguro',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Cambia a true en producción con HTTPS
    httpOnly: true,
    sameSite: 'none', // Mejor para desarrollo local
    maxAge: 24 * 60 * 60 * 1000
  },
  name: 'ttm.sid', // Nombre consistente
}));

// 4. Middleware de depuración (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 5. Rutas
const routes = [
  { path: '/usuarios', router: require('./routes/user') },
  { path: '/paquetes', router: require('./routes/paquetes') },
  { path: '/carrito', router: require('./routes/carrito') },
  { path: '/PedCompra', router: require('./routes/pedidoDeCompras') },
  { path: '/productos', router: require('./routes/productos') }
];

routes.forEach(route => {
  app.use(route.path, route.router);
});

// 6. Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// 7. Iniciar servidor
app.listen(PORT, () => {
  console.log(`\nServidor en memoria escuchando en http://localhost:${PORT}`);
  console.log('Configuración de sesión:');
  console.log('- Almacenamiento: Memoria');
  console.log(`- Cookie: ttm.sid (Dominio: 127.0.0.1)`);
  console.log(`- CORS: Permitido para http://127.0.0.1:5500\n`);
});