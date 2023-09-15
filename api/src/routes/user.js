const express = require('express');
const routeUsers = express.Router();
const user = require('../controllers/user');

routeUsers.get('/', (req, res) => { return res.json("Back Funciona") });

routeUsers.post('/user', user.create);
routeUsers.post('/login', user.login);
routeUsers.post('/create', user.post);

module.exports = routeUsers;