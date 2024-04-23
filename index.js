const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

// create a connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'text_app',
    password: '24004486'
});

let createRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),    
    ];
}

// closing the connection
// connection.end();

app.get('/', (req, res) => {
    let q = `SELECT count(*) FROM user`;
    try {
        connection.query(q, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.send(results);
        });
    } catch (err) {
        console.log(err);
        res.send('error in DB');
    }
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})

