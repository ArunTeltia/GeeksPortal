const util = require("util");
const mysql = require("mysql");
const config = require("./DBconfig");

const makeDb = (config) => {
  const connection = mysql.createConnection(config);
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
};

const db = makeDb(config);
module.exports = db;
