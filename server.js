'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const fetchAllMovies = require('./lib/phaseTwo/fetchAllMovies')

app.get('/', (req, res) => {
    res.send('This is an API, you shouldn\'t be here');
})
app.get('/getAll', fetchAllMovies);

app.listen(PORT, console.log(`server up on ${PORT}`));