
require('dotenv').config();

let str = String.raw`(localdb)\\mssqllocaldb`;

const config = {
    user: 'DESKTOP-816KFN7\\Kcils',
    password: '',
    server: str,
    database: 'AmazingToDoApp'
}
const sql = require('mssql');


sql.connect('Server=(localdb)\\mssqllocaldb,1433;Database=AmazingToDoApp;User Id=DESKTOP-816KFN7\\Kcils;Password=;Encrypt=true', err => {
    console.error('connect err',err);
    new sql.Request().query('SELECT * FROM TaskItem', (err, result) => {
    console.error('request err',err);
    console.log('result',result);
    })
})
sql.on('error', err => {
    console.error('.on err', err)
})



// Server=(localdb)\\mssqllocaldb,1433;Database=AmazingToDoApp;User Id=DESKTOP-816KFN7\\Kcils;Password=;Encrypt=true