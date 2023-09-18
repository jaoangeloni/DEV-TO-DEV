// app.js
const express = require('express');
const app = express();
const cors = require('cors');

const uploadRoutes = require('./src/routes/uploadRoutes.js');
const imagemRoutes = require('./src/routes/imagemRoutes.js');

app.use(express.json())
app.use(cors());
app.use(uploadRoutes);
app.use(imagemRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
