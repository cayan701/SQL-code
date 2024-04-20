const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'text_app',
    password: '24004486'
});

try {
    connection.query('SHOW TABLES', (err, results) => {
        if(err) throw err;
        console.log(results);
    });
} catch (err) {
    console.log(err);
}

let createRandomUser = () => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),    
    };
}
