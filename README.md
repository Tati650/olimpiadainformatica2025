# olimpiadainformatica2025
```carrito-turistico/
│
├── client/                   # Frontend (React, Vite, etc.)\n\l
│   ├── public/               # Archivos estáticos (favicon, index.html)
│   ├── src/
│   │   ├── assets/           # Imágenes, íconos
│   │   ├── components/       # Componentes reutilizables (Navbar, Botones)
│   │   ├── pages/            # Páginas (Login, Catálogo, Carrito, etc.)
│   │   ├── services/         # Conexión a la API (axios, fetch)
│   │   ├── context/          # Contextos de usuario o carrito
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                   # Backend (Node.js / Express)
│   ├── config/               # Conexiones (DB, variables env)
│   ├── controllers/          # Lógica de negocio (productos, pedidos)
│   ├── routes/               # Endpoints del servidor
│   ├── models/               # Modelos de datos / consultas SQL
│   ├── middlewares/          # Validaciones, auth
│   ├── utils/                # Funciones auxiliares (emails, formateos)
│   ├── app.js                # Instancia principal de Express
│   └── package.json
│
├── database/
│   ├── schema.sql            # Script de creación de tablas
│   ├── seed.sql              # Datos de ejemplo
│   └── db_diagram.png        # DER como imagen
│
├── docs/
│   ├── gantt.xlsx            # Cronograma de tiempos
│   ├── entrevistas.txt       # Relevamiento
│   ├── casos_uso.pdf         # Diagramas de casos de uso
│   ├── manual_ventas.pdf     # Manual de uso para jefe de ventas
│   ├── entregables.pdf       # PDF final para subir
│   └── capturas/             # Capturas de pantalla para el informe
│
├── .env                      # Variables de entorno (NO subir al repo)
├── .gitignore                # Ignorar node_modules, .env, etc.
├── README.md                 # Descripción del proyecto
└── LICENSE                   # (opcional)
```
