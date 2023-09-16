const con = require('../db/connect');
const Post = require('../models/post');

const criar = (req, res) => {
    let post = new Post(req.body)
    con.query(post.create(), (err, result) => {
        if (err == null)
            res.status(201).end()
        else
            res.status(500).json(err).end();
    })
}

const listar = (req, res) => {
    let post = new Post(req.params)
    con.query(post.read(), (err, result) => {
        if (err == null)
            res.json(result).end()
    })
}

const alterar = (req, res) => {
    let post = new Post(req.body);
    con.query(post.update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).end()
        else
            res.status(404).end()
    })
}

const excluir = (req, res) => {
    let post = new Post(req.params)
    con.query(post.delete(), (err, result) => {
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