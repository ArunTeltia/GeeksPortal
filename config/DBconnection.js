const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'rhythm',
//     password: 'jayee123',
//     database: 'BlogDB'
// });
const connection = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12343108",
  password: "XrW8FqeW8h",
  database: "sql12343108",
});

module.exports = connection;
