const express = require('express');
const routeUsers = express.Router();
const user = require('../controllers/user');

routeUsers.get('/', (req, res) => { return res.json("Back Funciona") });

routeUsers.post('/user/cadastrar', user.criar);
routeUsers.get('/user/listar/', user.listar);
routeUsers.get('/user/listar/:id', user.listar);
routeUsers.put('/user/alterar', user.alterar);
routeUsers.delete('/user/deletar/:id', user.excluir);
routeUsers.post('/user/login', user.login);

module.exports = routeUsers;