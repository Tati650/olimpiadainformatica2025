const { json } = require('express');
const { db } = require('../config/db');
const sql = require('../config/sql');

const obtener = async (req, res) => {
  try {    
    const alojamientos = await db.any(sql("Productos/Alojamiento.sql"));
    const autos = await db.any(sql("Productos/AlquilerAuto.sql"));
    const viajes = await db.any(sql("Productos/Viaje.sql"));
    console.log(alojamientos,autos,viajes)
    const productos = {
        alojamientos,
        autos,
        viajes
    };
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    obtener,
};  