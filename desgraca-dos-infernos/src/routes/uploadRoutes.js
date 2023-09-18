// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer'); // Importe o multer
const router = express.Router();
const uploadController = require('../controllers/uploadController');

const storage = multer.memoryStorage(); // Armazenar na memória em vez de disco
const upload = multer({ storage: storage });

router.get('/upload/', uploadController.renderUploadForm);
router.post('/upload/', upload.single('imagem'), uploadController.uploadImage);

module.exports = router;