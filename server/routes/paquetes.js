const express = require('express');
const router = express.Router();
const paquetesController = require('../controllers/paquetesController');

router.get('/', paquetesController.obtenerPaquetes);
router.get('/:id', paquetesController.obtenerPaquetePorID);

module.exports = router;

