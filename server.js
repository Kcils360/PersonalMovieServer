'use strict'

//bring in packages
require('dotenv').config();
const sql = require('mssql');
const fs = require('fs');
const express = require('express');
const superagent = require('superagent');

//set up the server
const PORT = process.env.PORT || 3000;
const app = express();

//Read in the movie dir and put titles in an array
let file = 'W:\Movies';

// let mov = [];
let raw = fs.readdirSync(file);
console.log('raw', raw);
// raw.forEach(m => {
//     mov.push(m.slice(0, -4).toString());
// });

// console.log('mov', mov);

//dirty get route to check our results
app.get("/", fillCollection)


//movie constructor
function Movie(movie) {
    this.title = movie.title ||null;
    this.id = movie.id || null;
    this.release_date = movie.release_date || null;
    this.tagline = movie.tagline || '';
    this.directors = [];
    this.genres = [];
    this.actors = [];
    this.local_file_path = '';
}

//iterate over the mov array and get movie info from themoviedb api
let info = [];
// let movieList = [];
let results = [];
// fillCollection(raw);

function fillCollection(req, res){
    const movieList = raw.forEach(f => {
        let title = f.slice(0, -4).toString()
        fetchMovieInfo(title, f, Movie)
        .then( data => {            
            fetchMoreMovieInfo(data)
            .then(data2 => {
                return fetchMoviePeopleInfo(data2)
                // .then(data3 => data3)
                
            });
        })
    })
    res.send(movieList)
}
//do work! hit the api and get specific movie info 
function fetchMovieInfo(title, file, Constructor){
    const key = process.env.MOVIEDBKEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${title}&page=1&include_adult=false`;
    return superagent.get(url)
    .then( data => {
        let m = new Constructor(data.body.results[0]);
        m.local_file_path = 'W:/Movies'+'/'+file;

        return m;
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
        movie.genres = n.genres.map( g => {
            return(g.name)
        });
        return movie;
    })
}

function fetchMoviePeopleInfo(movie) {
    const key = process.env.MOVIEDBKEY;
    const id = movie.id;
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`;
    return superagent.get(url)
    .then(data => {
        const m = data.body
        m.crew.map(c => {
            if(c.job === "Director"){
                movie.directors.push(c.name);
            }
        })
        movie.actors = []
        for(let i = 0; i < 4; i++){
            movie.actors.push(m.cast[i].name);
        }
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