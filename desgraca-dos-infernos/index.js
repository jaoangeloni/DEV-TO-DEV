// app.js
const express = require('express');
const app = express();
const uploadRoutes = require('./src/routes/uploadRoutes.js');
const imagemRoutes = require('./src/routes/imagemRoutes.js');

// Configure o banco de dados aqui, se necessário

app.use('/upload', uploadRoutes);
app.use('/imagem', imagemRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
