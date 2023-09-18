// routes/imagemRoutes.js
const express = require('express');
const router = express.Router();
const imagemController = require('../controllers/imagemController');

router.get('/imagem/:id', imagemController.getImageById);

module.exports = router;