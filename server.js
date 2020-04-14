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

//iterate over the mov array and get movie info from themoviedb api
let collection = [];

mov.forEach((film, idx) => {
    let name = film;
    let URL = `https://api.themoviedb.org/3/search/movie?api_key=d0be1622c33949eba10b6bc5729d9363&language=en-US&query=${name}&page=1&include_adult=false`;
    
    superagent.get(URL)
    .then(data => {
        let Movie = {};        
        Movie.title = data.body.results[0].title;
        Movie.id = data.body.results[0].id;
        collection.push(Movie);
        console.log(`collection@${idx}`, collection);
    })
})


//superagent to theMovieDB api to get info about each title and store in array of objects
//release_date
//id - this is the tmdb id to getcredits
//title
//tagline
//genre_ids
//poster_path https://image.tmdb.org/t/p/w500/ +
////getcredits - need id
//filter for job:directing
//           job:acting

//start the server and listen for requests
// app.listen(PORT, ()=> console.log(`Server up on ${PORT}`));