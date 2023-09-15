const con = require('../db/connect');
const GamePage = require('../models/gamePage');

const criar = (req, res) => {
    let gamepage = new GamePage(req.body)
    con.query(gamepage.create(), (err, result) => {
        if (err == null)
            res.status(201).end()
        else
            res.status(500).json(err).end();
    })
}

const listar = (req, res) => {
    let gamepage = new GamePage(req.params)
    con.query(gamepage.read(), (err, result) => {
        if (err == null)
            res.json(result).end()
    })
}

const alterar = (req, res) => {
    let gamepage = new GamePage(req.body);
    con.query(gamepage.update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).end()
        else
            res.status(404).end()
    })
}

const excluir = (req, res) => {
    let gamepage = new GamePage(req.params)
    con.query(gamepage.delete(), (err, result) => {
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