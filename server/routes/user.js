const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.obtenerUsuarios);
router.post('/login', userController.login);
router.get('/logout',userController.logout)
router.get('/check-session', userController.checkSession);
router.get('/:id', userController.obtenerUsuarioPorId);

module.exports = router;
