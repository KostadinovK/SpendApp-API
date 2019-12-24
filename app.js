const express = require('express');
const db = require('./config/database');

db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => res.send("<h1>Hello World</h1>"))

const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));