'use strict';

// require('dotenv').config();
const sql = require('mssql');


const config = {
    user: 'node',
    password: 'public',
    server: 'localhost\\MOVIESERVER',
    database: 'movieserverdb',
    options: {
        trusted_connection: 'True'        
    }
}

// let config = 'Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=True';


// sql.connect(config, function( err ) {
//     if(err)console.error('connect err',err);
//     // else(console.log('good connection'));
//     let request = new sql.Request();
//     request.query('SELECT * FROM movies', function (err, records) {
//         if(err)console.log('record err',err);
//         console.log('records', records);
//     });
//     sql.close();
// })

sql.connect(config, err => {
    if(err)console.error('connect err',err);
    let values = ['Test 3', -1, 'Yet another test'];

    let insert = new sql.Request()
 

    insert.query(insert.template`INSERT INTO movies (title, moviedb_id, tagline) VALUES (${values[0]}, ${values[1]}, ${values[2]})`);

    let request = new sql.Request();
    new sql.Request().query('SELECT * FROM movies', (err, result) => {
    if(err)console.error('result err',err);
        console.log('result', result);
    })
})







// Server=(localdb)\\mssqllocaldb,1433;Database=AmazingToDoApp;User Id=DESKTOP-816KFN7\\Kcils;Password=;Encrypt=true
