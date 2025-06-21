const { json } = require('express');
const { db } = require('../config/db');
const sql = require('../config/sql');

const obtenerPaquetes = async (req, res) => {
  try {
    const resultado = await db.any(sql("Paquetes/obtener.sql"));
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPaquetePorID = async(req, res) => {
  const { id } = req.params; // obtenemos el id de la URL
  try {
    const resultado = await db.any(sql('Paquetes/obtenerPorId.sql'), [id]);
    
    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'Paquete No encontrado' });
    }

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const cargarPaquete = async(req, res) => {
  try {
    const { id } = req.params;
    const { destino, cantViajeros, precio} = req.body;
    db.any(sql(""))
    res.status(201).json(resultado)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const eliminarPaquete = async(req, res) => {
  
}

module.exports = {
  obtenerPaquetes,
  obtenerPaquetePorID

};  