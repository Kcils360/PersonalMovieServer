'use strict';

const superagent = require('superagent');

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
//TODO modularize this function
//hit the api and get movie info like title, mdb_id, and release date 
module.exports = function fetchMovieInfo(title, file){
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