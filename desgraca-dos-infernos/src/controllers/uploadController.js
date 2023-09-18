// controllers/uploadController.js
const db = require('../db/connect'); // Importe o arquivo de configuração do banco de dados
const Post = require('../models/model.js')


exports.renderUploadForm = (req, res) => {
    res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="number" name="userId" />
    <input type="text" name="descImage" placeholder="Digite a descrição" />
    <input type="file" name="imagem" />
    <input type="submit" value="Enviar" />
    </form>
    `);
};

exports.uploadImage = (req, res) => {
    console.log(req.body)
    const userId = req.body.userId;
    const descImage = req.body.descImage;
    const postImage = req.file.buffer;
    
    const sql = 'INSERT INTO post (userId, descImage, postImage, date) VALUES (?, ?, ?, CURDATE());';

    db.query(sql, [userId, descImage, postImage], (err, result) => {
        if (err) {
            console.error('Erro ao inserir imagem no banco de dados: ' + err.message);
            res.status(500).send('Erro ao fazer o upload da imagem.');
        } else {
            console.log('Imagem inserida com sucesso.');
            res.status(200).send('Imagem enviada com sucesso.');
        }
        db.end();
    });
};
