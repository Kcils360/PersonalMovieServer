import React from 'react';

function MovieCard(props) {
    return (
        <div className="card">
            <h3>{props.movie.title}</h3>
            <img src={'https://image.tmdb.org/t/p/w500' + props.movie.poster_path} width="75"/>
            <p>Movie Tagline</p>
        </div>
    )
}

export default MovieCard;