const express = require('express');
const multer = require('multer'); 
const router = express.Router();
const upload = multer();

const post = require('../controllers/post');

router.post('/upload', upload.single('postImage'), post.criar);
router.get('/images/:id', post.listar);

module.exports = router;