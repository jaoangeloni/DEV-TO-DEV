const con = require('../db/connect');
const User = require('../models/user');

const criar = (req, res) => {
    let user = new User(req.body)
    con.query(user.create(), (err, result) => {
        if (err == null)
            res.status(201).end()
        else
            res.status(500).json(err).end();
    })
}

const listar = (req, res) => {
    let user = new User(req.params)
    con.query(user.read(), (err, result) => {
        if (err == null)
            res.json(result).end()
    })
}

const alterar = (req, res) => {
    let user = new User(req.body);
    con.query(user.update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).end()
        else
            res.status(404).end()
    })
}

const excluir = (req, res) => {
    let user = new User(req.params)
    con.query(user.delete(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(204).end()
        else
            res.status(404).end()
    })
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir
}