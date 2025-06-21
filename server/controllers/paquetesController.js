const { json } = require('express');
const pool = require('../config/db');
const sql = require('../config/sql');

const obtenerPaquetes = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM "Paquetes"');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPaquetePorID = async(req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('SELECT * FROM "Paquetes"');
    res.json(resultado.rows)
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

const cargarPaquete = async(req, res) => {
  try {
    const { id } = req.params;
    const { destino, cantViajeros, precio} = req.body;
    
    res.status(201).json(resultado)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const eliminarPaquete = async(req, res) => {
  
}

module.exports = {

};