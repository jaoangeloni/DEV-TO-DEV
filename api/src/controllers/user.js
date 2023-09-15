const con = require('../db/connect');
const Suco = require('../models/user');

const criar = (req, res) => {
    let suco = new Suco(req.body)
    con.query(suco.create(), (err, result) => {
        if (err == null)
            res.status(201).end()
        else
            res.status(500).json(err).end();
    })
}

const listar = (req, res) => {
    let suco = new Suco(req.params)
    con.query(suco.read(), (err, result) => {
        if (err == null)
            res.json(result).end()
    })
}

const alterar = (req, res) => {
    let suco = new Suco(req.body);
    con.query(suco.update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).end()
        else
            res.status(404).end()
    })
}

const excluir = (req, res) => {
    let suco = new Suco(req.params)
    con.query(suco.delete(), (err, result) => {
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