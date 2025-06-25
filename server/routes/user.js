const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.obtenerUsuarios);
router.get('/:id', userController.obtenerUsuarioPorId);
router.get('/usuarios/:user', userController.obtenerContrasena);

module.exports = router;
