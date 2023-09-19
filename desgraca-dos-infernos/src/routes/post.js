const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();

const post = require('../controllers/post');

router.post('/post/criar', upload.single('postImage'), post.criar);
router.get('/post/listar/:id', post.listar);
router.put('/post/alterar', post.alterar);
router.delete('/post/deletar/:id', post.excluir);

module.exports = router;