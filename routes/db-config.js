const sql = require("mysql");

// let db = sql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });


let db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'user_reg'
});

module.exports = db;