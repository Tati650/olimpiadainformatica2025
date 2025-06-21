const { json } = require('express');
const pool = require('../config/db');
const sql = require('../config/sql');



const obtenerUsuarios = async (req, res) => {
  try {
    const resultado = await pool.db.any(sql('../models/usuarios/obtener.sql'));
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params; // obtenemos el id de la URL
  try {
    const resultado = await pool.db.any(sql('../models/usuarios/obtenerPorId.sql'), [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
};
