const con = require('../db/connect');
const Like = require('../models/likes');

const criar = (req, res) => {
    let likes = new Like(req.body)
    con.query(likes.create(), (err, result) => {
        if (err == null)
            res.status(201).end()
        else
            res.status(500).json(err).end();
    })
}

const listar = (req, res) => {
    let likes = new Like(req.params)
    con.query(likes.read(), (err, result) => {
        if (err == null)
            res.json(result).end()
    })
}

const listarUser = (req, res) => {
    let likes = new Like(req.params)
    con.query(likes.readUser(), (err, result) => {
        if (err == null)
            res.json(result).end()
    })
}

const excluir = (req, res) => {
    let likes = new Like(req.params)
    con.query(likes.delete(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(204).end()
        else
            res.status(404).end()
    })
}

module.exports = {
    criar,
    listar,
    excluir,
    listarUser
}