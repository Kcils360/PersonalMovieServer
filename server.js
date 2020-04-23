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
 
//movie constructor
function Movie(movie) {
    this.title = movie.title ||null;
    this.moviedb_id = movie.id || null;
    this.release_date = movie.release_date || null;
    this.tagline = movie.tagline || '';
    this.directors = [];
    this.genres = [];
    this.actors = [];
    this.poster_path = '';
    this.local_file_path = '';
}

let info = [];

// fillCollection();
app.get('/', fillCollection)

function fillCollection(req, res){
    fetchRawList().forEach(f => {        
        let title = f.slice(0, -4).toString() //slice the file type off to get the name of the movie
        fetchMovieInfo(title, f, Movie)
        .then( data => {            
            fetchMoreMovieInfo(data)
            .then(data2 => { 
                // storeMovieInfo(data2)
                info.push(data2)
                console.log(info);       
            })
        })
    })
}
//Read in the movie dir and return an array of filenames
function fetchRawList(){
    let fp = 'W:/Movies';
    return fs.readdirSync(fp);
}

//hit the api and get movie info like title, mdb_id, and release date 
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
        });
        m.credits.crew.map(c => {
            if(c.job === "Director"){
                movie.directors.push(c.name);
            }
        })
        movie.actors = []
        for(let i = 0; i < 4; i++){
            movie.actors.push(m.credits.cast[i].name);
        }
        movie.poster_path = m.poster_path;
        return movie;
    })
}

function storeMovieInfo(movie) {
    sql.connect(process.env.LOCALDB)


}



// start the server and listen for requests
app.listen(PORT, ()=> console.log(`Server up on ${PORT}`));