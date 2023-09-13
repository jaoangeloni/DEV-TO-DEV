const express = require('express');
const route = express.Router();
const user = require('../controllers/teste');

route.get('/', (req, res) => { return res.json("Back Funciona") });

route.get('/listar/:id', user.teste);

module.exports = route;