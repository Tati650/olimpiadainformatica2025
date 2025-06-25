const express = require('express');
const router = express.Router();
const PCController = require('../controllers/pedidoCompraController');

router.get('/', PCController.obtener);

module.exports = router;