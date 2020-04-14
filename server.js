'use strict'

//bring in packages
require('dotenv').config;
const fs = require('fs');
const express = require('express');
const superagent = require('superagent');

//set up the server
const PORT = process.env.PORT || 3000;
const app = express();

//Read in the movie dir and put titles in an array
let file = 'W:\Movies';

let mov = [];
let data = fs.readdirSync(file);
console.log('data', data);
data.forEach(element => {
    mov.push(element.slice(0, -4).toString());
});

console.log('mov', mov);

//superagent to theMovieDB api to get info about each title and store in array of objects
//release_date
//title
//

//start the server and listen for requests
// app.listen(PORT, ()=> console.log(`Server up on ${PORT}`));