const { json } = require('express');
const { db } = require('../config/db');
const sql = require('../config/sql');

const obtener = async (req, res) => {
  try {
    const resultado = await db.any(sql("carrito/obtener.sql"));
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    obtener,
};  