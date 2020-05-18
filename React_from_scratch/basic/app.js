'use strict';


function getAllMovies() {
    $.get('http://localhost:3001/getAll')
    .then(data => {
        data.forEach(element => {
            movies.push(element)
        })
        appendMovies()
        // console.log('movies',movies);
    })
}


let movies = [];

function appendMovies(){
    movies.forEach(movie => {
        if(movie.moviedb_id > 0 && movie.poster_path != null){
            const title = movie.title;
            const img = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
            const tag = movie.tagline
            console.log('tagline', tag)
            $("#cards").append( "<div class='main'></div>");
            $(".main").append( `<h2 class='title'>${title}</h2`);
            $(".main").append(`<img src="${img}" width="100" class="poster">`);
            $(".main").append(`<p>${tag}</p>`)
            $(".main").removeClass("main");
        }
    })
}


$("#getAll").on("click", 
function(){
    getAllMovies();
});
