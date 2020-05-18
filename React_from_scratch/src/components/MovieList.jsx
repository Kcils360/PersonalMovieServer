import React, {useState} from 'react';  
import MovieCard from './MovieCard';

function MovieList(props) {
    return (
        <div>
            { props.movies.length > 0 ? props.movies.map( (movie) => (
            <MovieCard movie={movie} />
            )):
        <p>Movie list is empty</p> }
        </div>
    );
}

export default MovieList;