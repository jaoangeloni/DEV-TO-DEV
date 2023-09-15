const express = require('express');
const cors = require('cors');

const routeUsers = require('./src/routes/user');
const routeComments = require('./src/routes/comments');

const app = express();
app.use(cors());
app.use(express.json());

app.use(routeUsers);
app.use(routeComments);


app.listen(3000, () => {
    console.log("POSITIVO E OPERANTE");
});