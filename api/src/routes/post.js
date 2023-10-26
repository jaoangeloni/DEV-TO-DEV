const express = require('express');
const routePost = express.Router();

const post = require('../controllers/post');

routePost.post('/post/criar', post.criar);
routePost.get('/post/listar/', post.listar);
routePost.get('/post/listar/:username', post.listar);
routePost.put('/post/alterar', post.alterar);
routePost.delete('/post/deletar/:id', post.excluir);

module.exports = routePost;