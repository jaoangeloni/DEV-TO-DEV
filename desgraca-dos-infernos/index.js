// app.js
const express = require('express');
const app = express();
const cors = require('cors');

const post = require('./src/routes/post.js');

app.use(express.json())
app.use(cors());

app.use(post);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
