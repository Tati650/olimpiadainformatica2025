const { json } = require('express');
const { db } = require('../config/db');
const sql = require('../config/sql');

const pool = require('../config/db');


const obtenerUsuarios = async (req, res) => {
  try {
    const resultado = await db.any(sql('Users/obtener.sql'));
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params; // obtenemos el id de la URL
  try {
    const resultado = await db.any(sql('Users/obtenerPorId.sql'), [id]);
    
    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const obtenerContrasena = async (req, res) => {
  const { user } = req.params; // obtenemos el id de la URL
  try {
    const resultado = await db.any(sql('Users/obtenerContrasena.sql'), [user]);
    
    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  obtenerContrasena,
};