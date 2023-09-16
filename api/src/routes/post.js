const express = require('express');
const routeComments = express.Router();
const post = require('../controllers/post');

routeComments.get('/', (req, res) => { return res.json("Back Funciona") });

routeComments.post('/post/criar', post.criar);
routeComments.get('/post/listar/:id', post.listar);
routeComments.put('/post/alterar', post.alterar);
routeComments.delete('/post/deletar/:id', post.excluir);

module.exports = routeComments;