const express = require('express');
const routeLikes = express.Router();
const likes = require('../controllers/likes');

routeLikes.get('/', (req, res) => { return res.json("Back Funciona") });

routeLikes.post('/likes/curtir', likes.criar);
routeLikes.get('/likes/listar/:id', likes.listar);
routeLikes.get('/likes/listar/:postId/:userId', likes.listarUser);
routeLikes.delete('/likes/deletar/:id', likes.excluir);

module.exports = routeLikes;