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

  try {
    const usuario = await db.oneOrNone(sql('Users/obtenerContrasena.sql'), [nombre]);
    if (usuario === null || usuario.Contrasena !== password) {
      console.log('hola')

      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    req.session.user = {
      username: usuario.Nombre_Usuario,
      isAdmin: usuario.IsAdmin
    };
    req.session.save(err => {
      if (err) {
        console.error('Error al guardar sesión:', err);
        return res.status(500).json({ error: 'Error interno' });
      }
      
      console.log('usuario guardado correctamente.')
      res.json({ 
        success: true,
        user: req.session.user
      });
    });
    console.log(req.session)
    
    


  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const checkSession = (req, res) => {
  console.log('Headers recibidos:', req.headers);
  console.log('Cookies recibidas:', req.cookies);
  console.log('Sesión almacenada:', req.session);
  console.log('usuario almacenada:', req.session.user);

  if (!req.session?.user?.id) {
    console.error('Sesión inválida. Razones posibles:',
      '\n1. Cookie no recibida',
      '\n2. Sesión no guardada',
      '\n3. Problema con store de sesión');
    return res.status(401).json({ isLoggedIn: false });
  }

  res.json({
    isLoggedIn: true,
    user: req.session.user
  });
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false });
    }
    res.clearCookie('connect.sid'); // Nombre de la cookie de sesión
    res.json({ success: true });
  });
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  login,
  logout,
  checkSession,
};