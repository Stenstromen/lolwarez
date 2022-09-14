const mysql = require("mysql");

const hostName = process.env.MYSQL_HOSTNAME;
const dataBase = process.env.MYSQL_DATABASE;
const userName = process.env.MYSQL_USERNAME;
const passWord = process.env.MYSQL_PASSWORD;

const con = mysql.createConnection({
    host: hostName,
    database: dataBase,
    user: userName,
    password: passWord,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql =
      "CREATE TABLE filez (id INT AUTO_INCREMENT PRIMARY KEY, fileid VARCHAR(255), filename VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) {
          console.log("Table 'filez' already exists")
          return;
      }
      console.log("Table created");
    });
  });
  
  module.exports = con;