// controllers/imagemController.js
const db = require('../db/connect'); // Importe o arquivo de configuração do banco de dados

exports.getImageById = (req, res) => {
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
};
