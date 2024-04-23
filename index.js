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

let q = "INSERT INTO user (id, username, email, password) VALUES ?";

let data = [];
for (let i=1; i<=100; i++) {
    data.push(createRandomUser());
}


// simple query
try {
    connection.query(q, [data], (err, results) => {
        if(err) throw err;
        console.log(results);
    });
} catch (err) {
    console.log(err);
}

// closing the connection
connection.end();

app.get('/', (req, res) => {
    console.log('Welcome to homepage!');
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})

