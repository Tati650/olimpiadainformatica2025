const { Pool } = require('pg');

const pool = new Pool({
  user: "Backend",
  host: "localhost",
  database: "Carrito",
  password: "1234",
  port: "5432",
});

module.exports = pool;