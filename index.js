const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

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
};

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
});

app.get('/user', (req, res) => {
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
});

// Edit route

app.get('/user/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let user = results[0];
            res.render("edit.ejs", { user });
        })
    } catch (error) {
        console.log(error);
        res.send('error in DB');
    }
});


// update DB route
app.patch('/user/:id', (req, res) => {
    let { id } = req.params;
    let { password: formPass, username: newUsername } = req.body;
    let q = `SELECT * FROM user WHERE id="${id}"`;

    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let user = results[0];

            if(formPass != user.password) {
                res.send('Wrong password');
            }
            res.send(user);
        })
    } catch (error) {
        console.log(err);
        res.send('error in DB');
    }
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
