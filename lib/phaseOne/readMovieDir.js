'use strict';

const fs = require('fs');

//Read in the movie dir and return an array of filenames
module.exports = function fetchRawList(){
    let fp = 'W:/Test'; //this can be changed to any path
    return fs.readdirSync(fp);
}