const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

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
            let count = results[0]["count(*)"];
            res.render('home.ejs', { count });  
        });
    } catch (err) {
        console.log(err);
        res.send('error in DB');
    }
})

app.get('/users', (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, users) => {
            if(err) throw err;
            //console.log(results);
            res.render('showusers.ejs', { users });  
        });
    } catch (err) {
        console.log(err);
        res.send('error in DB');
    }
})

// Edit route

app.get('/user/:id/edit', (req, res) => {
    res.render('edit.ejs');
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
