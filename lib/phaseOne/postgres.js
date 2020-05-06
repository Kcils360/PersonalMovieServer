'use strict';

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error('pg problms', err))
client.connect()


const SQL = `INSERT INTO movies(  
    title, moviedb_id, tagline, releasedate, genres, directors, actors, poster_path, local_file_path)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
const values = [movie.title, movie.moviedb_id, movie.tagline, movie.release_date, movie.genres, movie.directors, movie.actors, movie.poster_path, movie.local_file_path];

client.query(SQL, values)
.then(result => {
    console.log('insert success', result.command + ' ' + result.rowCount);
})