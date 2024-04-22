const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');


// create a connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'text_app',
    password: '24004486'
});

let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";



// simple query
try {
    connection.query(q, (err, results) => {
        if(err) throw err;
        console.log(results);
    });
} catch (err) {
    console.log(err);
}

// closing the connection

connection.end();

let createRandomUser = () => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),    
    };
}
