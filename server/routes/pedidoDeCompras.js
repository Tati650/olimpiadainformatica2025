const express = require('express');
const router = express.Router();
const PCController = require('../controllers/pedidoCompraController');

router.get('/', PCController.obtenerPedidos);
router.post('/', PCController.crear);
router.put('/:id/:Aprovado',PCController.actualizarEstado)

module.exports = router;