// controllers/uploadController.js
const multer = require('multer');
const db = require('../db/connect'); // Importe o arquivo de configuração do banco de dados
const upload = multer();

exports.renderUploadForm = (req, res) => {
    res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="imagem" />
    <input type="submit" value="Enviar" />
    </form>
    `);
};

exports.uploadImage = (req, res) => {
    const nomeImagem = req.file.originalname;
    const dadosImagem = req.file.buffer;

    // Insira os dados da imagem na tabela do banco de dados
    const sql = 'INSERT INTO imagens (nome, imagem) VALUES (?, ?)';
    db.query(sql, [nomeImagem, dadosImagem], (err, result) => {
        if (err) {
            console.error('Erro ao inserir imagem no banco de dados: ' + err.message);
            res.status(500).send('Erro ao fazer o upload da imagem.');
        } else {
            console.log('Imagem inserida com sucesso.');
            res.status(200).send('Imagem enviada com sucesso.');
        }
    });
};

