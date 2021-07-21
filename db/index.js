const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST, 
    database: process.env.PGDATABASE, 
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

(async function() {
    await   pool.query('CREATE TABLE IF NOT EXISTS users ( user_id VARCHAR(40) NOT NULL PRIMARY KEY, first_name VARCHAR(10) NOT NULL, last_name VARCHAR(10) NOT NULL, phone_number VARCHAR(10) NOT NULL, email VARCHAR(100) NOT NULL, hash_password VARCHAR(50) NOT NULL, UNIQUE(email), UNIQUE(phone_number))')
                .catch(err => {
                        console.log(err)
                });

    await   pool.query('CREATE TABLE IF NOT EXISTS products ( product_id VARCHAR(40) NOT NULL PRIMARY KEY ,title VARCHAR(30) NOT NULL, price NUMERIC NOT NULL, type VARCHAR(20), sold INT DEFAULT 0)')
                .catch(err => {
                        console.log(err)
                });

    await   pool.query('CREATE TABLE IF NOT EXISTS carts ( cart_id VARCHAR(40) NOT NULL PRIMARY KEY, user_id VARCHAR(40) REFERENCES users(user_id), product_id VARCHAR(40) REFERENCES products(product_id))')
                .catch(err => {
                    console.log(err)
                });
    await   pool.query('CREATE TABLE IF NOT EXISTS contacts (session_id VARCHAR(40) NOT NULL PRIMARY KEY, first_name VARCHAR(10) NOT NULL, last_name VARCHAR(10) NOT NULL, phone_number VARCHAR(10) NOT NULL, email VARCHAR(100) NOT NULL, message VARCHAR(500) NOT NULL, target VARCHAR(20) NOT NULL)')           
                .catch(err => { 
                    console.log(err)
                })
    console.log("databse was set up successfully") 
})();

module.exports = {
    query: (text, params) => pool.query(text, params),
};




