'use strict'

//bring in packages
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const superagent = require('superagent');


const client = require('mssql');

const config = {
    user: 'node',
    password: 'public',
    server: 'localhost\\MOVIESERVER',
    database: 'movieserverdb',
    options: {
        trusted_connection: 'True'        
    }
}

//set up the server
const PORT = process.env.PORT || 3000;
const app = express();
 
//movie constructor
function Movie(movie) {
    this.title = movie.title;
    this.moviedb_id = movie.id;
    this.release_date = movie.release_date || null;
    this.tagline = movie.tagline || '';
    this.directors = '';
    this.genres = '';
    this.actors = '';
    this.poster_path = '';
    this.local_file_path = movie.local_file_path;
}

let info = [];

fillCollection();
// app.get('/', fillCollection)

function fillCollection(req, res){
    fetchRawList().forEach(f => {        
        let title = f.slice(0, -4).toString() //slice the file type off to get the name of the movie
        fetchMovieInfo(title, f)
        .then( data => {     
            if (data.moviedb_id === -1){
                storeMovieInfo(data);
            } else{
                fetchMoreMovieInfo(data)
                .then(data2 => { 
                    storeMovieInfo(data2)      
                })
            }                 
        })
    })
}
//Read in the movie dir and return an array of filenames
function fetchRawList(){
    let fp = 'W:/Test'; //this can be changed to any path
    return fs.readdirSync(fp);
}

//TODO modularize this function
//hit the api and get movie info like title, mdb_id, and release date 
function fetchMovieInfo(title, file){
    const key = process.env.MOVIEDBKEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${title}&page=1&include_adult=false`;
    return superagent.get(url)
    .then( data => {
        if(data.body.total_results === 0){
            return new Movie({title: file, id: -1, local_file_path: 'W:/Movies'+'/'+file})
        }
        let m = new Movie(data.body.results[0]);
        m.local_file_path = 'W:/Movies'+'/'+file;
        return m;
    })
}

//TODO modularize this function
//hit api again with the mdb_id and get the rest of the movie object info
function fetchMoreMovieInfo(movie){
    const key = process.env.MOVIEDBKEY;
    const id = movie.moviedb_id;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=credits`;
    return superagent.get(url)
    .then(data => {
        const m = data.body
        movie.tagline = m.tagline;
        movie.genres = m.genres.map( g => {
            return(g.name)
        }).toString();
        let directors = []
        m.credits.crew.map(c => {
            if(c.job === "Director"){
                directors.push(c.name);
            }
        });
        movie.directors = directors.toString();
        let actors = []
        for(let i = 0; i < 4; i++){
            actors.push(m.credits.cast[i].name);
        }
        movie.actors = actors.toString();
        movie.poster_path = m.poster_path;

        return movie;
    })
}

//TODO modularize this function
//take the movie object and store it in the database
function storeMovieInfo(movie) {
    client.connect(config, err => {
        if(err)console.error('connect err',err);

        const insert = new client.Request()
        insert.query(insert.template`INSERT INTO movies (title, moviedb_id, tagline, release_date, genres, directors, actors, poster_path, local_file_path) 
        VALUES (${movie.title}, ${movie.moviedb_id}, ${movie.tagline}, ${movie.release_date}, ${movie.genres}, ${movie.directors}, ${movie.actors}, ${movie.poster_path}, ${movie.local_file_path});`)
    })
}



// start the server and listen for requests
app.listen(PORT, ()=> console.log(`Server up on ${PORT}`));