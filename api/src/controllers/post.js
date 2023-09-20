const db = require('../db/connect');
const Post = require('../models/post')

const criar = (req, res) => {
    const userId = req.body.userId;
    const descImage = req.body.descImage;
    let postImage = null;
    let mimeType = null;

    if (req.file) {
        postImage = req.file.buffer;
        mimeType = req.file.mimetype;
    }

    const sql = 'INSERT INTO post (userId, descImage, postImage, mime_type, date) VALUES (?, ?, ?, ?, CURDATE());';

    db.query(sql, [userId, descImage, postImage, mimeType], (err, result) => {
        if (err) {
            console.error('Erro ao inserir imagem no banco de dados: ' + err.message);
            res.status(500).send('Erro ao fazer o upload da imagem.').end();
        } else {
            console.log('Imagem inserida com sucesso.');

            res.status(200).json(result.insertId).end();
        }
    });
};

const listar = (req, res) => {
    let post = new Post(req.params)
    db.query(post.read(), (err, result) => {
        if (err == null)

            res.json(result).end()
    })
}

const alterar = (req, res) => {
    let post = new Post(req.body);
    db.query(post.update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).end()
        else
            res.status(404).end()
    })
}

const excluir = (req, res) => {
    let post = new Post(req.params)
    db.query(post.delete(), (err, result) => {
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