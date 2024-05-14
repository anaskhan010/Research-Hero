var mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "research_hero",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL Database connected Successfully");
  }
});

module.exports = db;
