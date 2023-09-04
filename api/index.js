const express = require('express');
const cors = require('cors');

const routeUsers = require('./src/routes/user');

const app = express();
app.use(cors());
app.use(express.json());

app.use(routeUsers);


app.listen(3000, () => {
    console.log("POSITIVO E OPERANTE");
});