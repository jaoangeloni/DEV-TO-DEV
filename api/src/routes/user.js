const express = require('express');
const routeUsers = express.Router();
const user = require('../controllers/user');

routeUsers.get('/', (req, res) => { return res.json("Back Funciona") });

routeUsers.post('/user', user.create);

module.exports = routeUsers;