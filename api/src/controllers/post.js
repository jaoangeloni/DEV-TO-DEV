const db = require('../db/connect');
const Post = require('../models/post')
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
})

const criar = (req, res) => {
    upload.single('postImage')(req, res, (err) => {
        if (err) throw err;

        const userId = req.body.userId;
        const descImage = req.body.descImage;

        const imageFile = req.file;
        const { mimetype, buffer } = imageFile;

        cloudinary.uploader
            .upload_stream((error, result) => {
                if (error) throw error;

                const { url } = result;

                const data = {
                    userId: userId,
                    descImage: descImage,
                    postImage: url,
                    mime_type: mimetype,
                    date: 'CURDATE()'
                }

                const sql = 'INSERT INTO post SET ?;';

                db.query(sql, data, (err, result) => {
                    if (err) {
                        console.error('Erro ao inserir imagem no banco de dados: ' + err.message);
                        res.status(500).send('Erro ao fazer o upload da imagem.').end();
                    } else {
                        console.log('Imagem inserida com sucesso.');

                        res.status(200).json(result.insertId).end();
                    }
                });
            })
            .end(buffer)
    })
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