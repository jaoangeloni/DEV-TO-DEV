const express = require('express');
const routePage = express.Router();
const gamepage = require('../controllers/gamePage');

routePage.get('/', (req, res) => { return res.json("Back Funciona") });

routePage.post('/gamepage/criar', gamepage.criar);
routePage.get('/gamepage/listar', gamepage.listar);
routePage.get('/gamepage/listar/:id', gamepage.listar);
routePage.put('/gamepage/alterar', gamepage.alterar);
routePage.delete('/gamepage/deletar/:id', gamepage.excluir);

module.exports = routePage;