// controllers/imagemController.js
const db = require('../db/connect'); // Importe o arquivo de configuração do banco de dados
const Post = require('../models/model')

const listar = (req, res) => {
    let post = new Post(req.params)
    db.query(post.read(), (err, result) => {
        if (err == null)
            res.json(result).end()
    })
}

module.exports = {
    listar
}