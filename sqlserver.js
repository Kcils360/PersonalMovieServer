'use strict';

// require('dotenv').config();
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

//take the movie object and store it in the database
function storeMovieInfo(movie) {
    client.connect(config, err => {
        if(err)console.error('connect err',err);

        const insert = new client.Request()
        insert.query(insert.template`INSERT INTO movies (title, moviedb_id, tagline, release_date, genres, directors, actors, poster_path, local_file_path) 
        VALUES (${movie.title}, ${movie.moviedb_id}, ${movie.tagline}, ${movie.release_date}, ${movie.genres}, ${movie.directors}, ${movie.actors}, ${movie.poster_path}, ${movie.local_file_path});`)
    })
}
