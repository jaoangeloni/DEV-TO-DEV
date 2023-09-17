const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'devtodev'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.message);
    } else {
        console.log('Conectado ao banco de dados.');
    }
});

// Configuração do multer para processar uploads
const upload = multer();

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para exibir um formulário de upload de imagem
app.get('/upload', (req, res) => {
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="imagem" />
            <input type="submit" value="Enviar" />
        </form>
    `);
});

// Rota para processar o upload da imagem
app.post('/upload', upload.single('imagem'), (req, res) => {
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
});

app.get('/imagem/:id', (req, res) => {
    const imagemId = req.params.id;

    // Consulta para obter os dados binários da imagem pelo ID
    const sql = 'SELECT imagem FROM imagens WHERE id = ?';

    db.query(sql, [imagemId], (err, result) => {
        if (err) {
            console.error('Erro ao buscar imagem no banco de dados: ' + err.message);
            res.status(500).send('Erro ao buscar imagem.');
        } else {
            if (result.length === 0) {
                res.status(404).send('Imagem não encontrada.');
            } else {
                const imagem = result[0].imagem;
                res.writeHead(200, {
                    'Content-Type': 'image/jpeg', // Defina o tipo MIME correto para sua imagem
                    'Content-Length': imagem.length
                });
                res.end(imagem);
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});