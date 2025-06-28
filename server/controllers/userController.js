const { json } = require('express');
const session = require('express-session');

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
const login = async (req, res) => {
  const { nombre, password } = req.body;
  console.log('Datos recibidos:', { nombre, password });

  // Validación básica
  if (!nombre || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Nombre de usuario y contraseña son requeridos' 
    });
  }

  try {
    // Buscar usuario en la base de datos
    const usuarios = await db.any(sql('Users/obtenerContrasena.sql'), 
      [nombre]
    );
    
    // Verificar si el usuario existe
    if (usuarios.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuario no encontrado' 
      });
    }

    const usuario = usuarios[0];

    console.log('Usuario encontrado en DB:', usuario);
    console.log('Contraseña recibida:', password);
    console.log('Contraseña en DB:', usuario.Contrasena);
    
    // Comparación directa de contraseña (sin bcrypt)
    if (password !== usuario.Contrasena) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales incorrectas' 
      });
    }

    // Responder sin incluir la contraseña
    const { Contrasena, ...usuarioSinPassword } = usuario;
    
    // Usamos sesiones en lugar de JWT
    req.session.user = usuarioSinPassword;
    console.log(usuario)
    res.json({ 
      success: true,
      usuario: usuarioSinPassword,
      // En lugar de token, el frontend deberá manejar cookies de sesión
      message: 'Sesión iniciada correctamente'
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  login,
};