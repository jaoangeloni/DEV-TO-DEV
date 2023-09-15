const express = require('express');
const routeComments = express.Router();
const comentario = require('../controllers/comments');

routeComments.get('/', (req, res) => { return res.json("Back Funciona") });

routeComments.post('/comentario/criar', comentario.criar);
routeComments.get('/comentario/listar/:id', comentario.listar);
routeComments.put('/comentario/alterar', comentario.alterar);
routeComments.delete('/comentario/deletar/:id', comentario.excluir);

module.exports = routeComments;