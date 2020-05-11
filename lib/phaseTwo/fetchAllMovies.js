'use strict';

const config = process.env.DATABASE_URL;
const client = require('mssql');

module.exports = 
    function fetchAllMovies(req, res){
    client.connect(config, err => {
        if(err)console.error('connect err',err);
        client.query(`select * from movies`)
        .then(data => {
            // console.log(data.recordset)
            res.send(data.recordset)
        })
    })
}
