'use strict'

const readDir = require('./lib/phaseOne/readMovieDir.js');
const fetchMovieInfo = require('./lib/phaseOne/firstFetch');
const fetchMoreMovieInfo = require('./lib/phaseOne/secondFetch');
const storeMovieInfo = require('./lib/phaseOne/sqlserver');


(function (){
    readDir().forEach(f => {        
        let title = f.slice(0, -4).toString() //slice the file type off to get the name of the movie
        fetchMovieInfo(title, f)
        .then( data => {     
            if (data.moviedb_id === -1){
                console.log('title not found');
                storeMovieInfo(data);
            } else{
                fetchMoreMovieInfo(data)
                .then(data2 => { 
                    console.log('data2')   
                    storeMovieInfo(data2)   
                })
            }                 
        })
    })
})();
