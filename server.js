'use strict'

//bring in packages
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const superagent = require('superagent');

//set up the server
const PORT = process.env.PORT || 3000;
const app = express();

//Read in the movie dir and put titles in an array
let file = 'W:\Movies';

let mov = [];
let raw = fs.readdirSync(file);
console.log('raw', raw);
raw.forEach(m => {
    mov.push(m.slice(0, -4).toString());
});

console.log('mov', mov);

//dirty get route to check our results
app.get("/", (req, res) => {
    let v = getMoreInfo(info)
})

//movie constructor
function Movie(movie) {
    this.title = movie.title ||null;
    this.id = movie.id || null;
    this.release_date = movie.release_date || null;
    this.tagline = movie.tagline || null;
    this.director = movie.director || null;
    this.genre = movie.genre_id || null;
}

//iterate over the mov array and get movie info from themoviedb api
let info = [];
let movieList = [];
let results = [];
fillCollection(mov);

function fillCollection(array){
    array.forEach(m => {
        fetchMovieInfo(m, Movie)
        .then( data => {            
            info.push(data);
        })
    })
}
//do work! hit the api and get specific movie info 
function fetchMovieInfo(film, Constructor){
    const key = process.env.MOVIEDBKEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${film}&page=1&include_adult=false`;
    return superagent.get(url)
    .then( data => {
        return new Constructor(data.body.results[0])
    })
}

async function getMoreInfo(array){
    return array.forEach(m => {
        return fetchMoreMovieInfo(m)
        // .then(data => {
        //     results.push(data);
        //     console.log('getMore',results)
        // })
    })
}

function fetchMoreMovieInfo(movie){
    const key = process.env.MOVIEDBKEY;
        const id = movie.id;
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
        return superagent.get(url)
        .then(data => {
            const n = data.body
            movie.tagline = n.tagline;
            movie.genre = n.genres;
            return movie;
        })
}



//superagent to theMovieDB api to get info about each title and store in array of objects
//first get -
//release_date
//id - this is the tmdb id to getcredits
//title

//second get - using id and passing the object
//tagline
//genre_id
//poster_path https://image.tmdb.org/t/p/w500/ +
////getcredits - need id
//filter for job:directing
//           job:acting

// start the server and listen for requests
app.listen(PORT, ()=> console.log(`Server up on ${PORT}`));