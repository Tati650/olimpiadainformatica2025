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
const registrarUsuario = async (req, res) => {
  const { nombre, username, email, password, isAdmin = false } = req.body;

  try {
    // Validación básica de campos requeridos
    if (!nombre || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son obligatorios",
        camposFaltantes: {
          nombre: !nombre,
          username: !username,
          email: !email,
          password: !password
        }
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Formato de email inválido",
        campo: "email"
      });
    }

    // Validar longitud mínima de contraseña
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "La contraseña debe tener al menos 8 caracteres",
        campo: "password"
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await db.oneOrNone(
      `SELECT "Nombre_Usuario", "Email" FROM "Usuario" 
       WHERE "Nombre_Usuario" = $1 OR "Email" = $2`,
      [username, email]
    );

    if (usuarioExistente) {
      const errors = {};
      if (usuarioExistente.Nombre_Usuario === username) {
        errors.username = "El nombre de usuario ya está en uso";
      }
      if (usuarioExistente.Email === email) {
        errors.email = "El email ya está registrado";
      }

      return res.status(409).json({
        success: false,
        error: "Conflicto con los datos proporcionados",
        conflicts: errors
      });
    }

    // Insertar nuevo usuario en la base de datos (sin hashing)
    const nuevoUsuario = await db.tx(async t => {
      // Insertar usuario
      const usuario = await t.one(
        `INSERT INTO "Usuario" (
          "Nombres",
          "Nombre_Usuario", 
          "Email", 
          "Contrasena", 
          "IsAdmin"
        ) VALUES ($1, $2, $3, $4, false)
        RETURNING "Cliente_ID", "Nombre_Usuario", "Email", "IsAdmin"`,
        [
          nombre,
          username,
          email,
          password, // ¡ADVERTENCIA! Contraseña sin encriptar
          isAdmin,
          new Date().toISOString()
        ]
      ); return usuario;
    });

    // Responder con éxito
    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      user: {
        id: nuevoUsuario.Cliente_ID,
        username: nuevoUsuario.Nombre_Usuario,
        email: nuevoUsuario.Email,
        isAdmin: nuevoUsuario.IsAdmin
      },
      // ¡ADVERTENCIA! En producción NUNCA devolver la contraseña
      warning: "La contraseña no fue encriptada"
    });

  } catch (error) {
    console.error("Error en el registro:", error);

    // Manejar errores específicos de la base de datos
    if (error.code === '23505') { // Violación de unique constraint
      return res.status(409).json({
        success: false,
        error: "El nombre de usuario o email ya están registrados"
      });
    }

    res.status(500).json({
      success: false,
      error: "Error interno del servidor al registrar el usuario",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  login,
  logout,
  checkSession,
  registrarUsuario
};