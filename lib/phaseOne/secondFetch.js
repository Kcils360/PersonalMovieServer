'use strict';

const superagent = require('superagent');


//hit api again with the mdb_id and get the rest of the movie object info
module.exports = function fetchMoreMovieInfo(movie){
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
        console.log(movie);
        return movie;
    })
}