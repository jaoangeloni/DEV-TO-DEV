const mysql = require('mysql');

const db = require('./db/connect')

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.message);
    } else {
        console.log('Conectado ao banco de dados.');
    }
});

class Imagem {
    static getById(id, callback) {
        const sql = 'SELECT * FROM imagens WHERE id = ?';

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar imagem no banco de dados: ' + err.message);
                callback(err, null);
            } else {
                if (result.length === 0) {
                    callback(null, null);
                } else {
                    const imagem = result[0];
                    callback(null, imagem);
                }
            }
        });
    }
}

module.exports = Imagem;
