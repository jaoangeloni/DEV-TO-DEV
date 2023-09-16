const con = require('../db/connect');
const Comments = require('../models/comments');

const criar = (req, res) => {
    let comments = new Comments(req.body)
    con.query(comments.create(), (err, result) => {
        if (err == null)
            res.status(201).end()
        else
            res.status(500).json(err).end();
    })
}

const listar = (req, res) => {
    let comments = new Comments(req.params)
    con.query(comments.read(), (err, result) => {
        if (err == null)
            res.json(result).end()
    })
}

const alterar = (req, res) => {
    let comments = new Comments(req.body);
    con.query(comments.update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).end()
        else
            res.status(404).end()
    })
}

const excluir = (req, res) => {
    let comments = new Comments(req.params)
    con.query(comments.delete(), (err, result) => {
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