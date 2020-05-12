'use strict';

let movies = [];

function getAllMovies() {
    $.get('http://localhost:3001/get')
    .then(data => {
        console.log(data);
    })
}

function test(){
    console.log('test');
}

$("get").click(getAllMovies());
//Getting a CORS issue here.  TODO: fix the cors issue
