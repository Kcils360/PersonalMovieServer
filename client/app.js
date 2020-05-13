'use strict';

let movies = [];

function getAllMovies() {
    $.get('http://localhost:3001/getAll')
    .then(data => {
        // movies.push(data[0])
        console.log(data);
    })
}

// $(function() {
//     $("getAll").click(test());
// })

$("#getAll").click(test());


// $("#cards").append( $("<div id='main'></div>"));
// $("#main").append( $(`<h2>${}</h2`))


function test(){
    console.log('test');
}