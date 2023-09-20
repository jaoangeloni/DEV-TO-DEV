const express = require('express');
const multer = require('multer');
const routePost = express.Router();

const upload = multer();

const post = require('../controllers/post');

routePost.post('/post/criar', upload.single('postImage'), post.criar);
routePost.get('/post/listar/:id', post.listar);
routePost.put('/post/alterar', post.alterar);
routePost.delete('/post/deletar/:id', post.excluir);

module.exports = routePost;