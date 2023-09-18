// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer'); 

const router = express.Router();
const uploadController = require('../controllers/uploadController');

// const storage = multer.memoryStorage(); 
const upload = multer();

router.get('/upload', uploadController.renderUploadForm);
router.post('/upload', upload.single('postImage'), uploadController.uploadImage);

module.exports = router;