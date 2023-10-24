require('dotenv').config();
const express = require('express');
const app = express();
const upload = require('./multer');
const con = require('./database');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

function uploadImage(req, res) {
    upload.single('image')(req, res, (err) => {
        if (err) throw err;

        const imageFile = req.file;
        const { originalname, mimetype, buffer } = imageFile;

        cloudinary.uploader
            .upload_stream((error, result) => {
                if (error) throw error;

                const { url, id } = result;

                const data = {
                    name: originalname,
                    type: mimetype,
                    url: url
                }

                const sql = 'INSERT INTO images SET ?'

                con.query(sql, data, (err, result) => {
                    if (err) throw err;
                    res.json({
                        message: 'sucesso'
                    })
                })
            })
            .end(buffer)
    })
}

app.post('/upload', uploadImage)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/images', (req, res) => {
    const sql = 'SELECT * FROM images'
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Positivo e operante'))