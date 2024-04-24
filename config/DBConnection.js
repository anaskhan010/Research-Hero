import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: "researchhero",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MYSQL Database connected Successfully');
    }
});

export default db;
