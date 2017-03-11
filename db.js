/**
 * Created by pawan on 14/2/17.
 */

const mysql = require('mysql');

var dbconf = {
    host: 'localhost',
    user: 'pawan',
    password: 'bansal',
    database: 'mydatabase',
}

function getAllProducts(done){
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query('SELECT * FROM products', function(err, result, fields){
        if(err) throw err;
        done(result);
        conn.end();
    })
}

function addNewProduct(name, price, done){
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query('INSERT INTO products SET ?', {name: name, price: price}, function(err, result, fields){
        if(err) throw err;
        done(result);
        conn.end();
    })
}

function removeProduct(id, done){
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query('DELETE FROM products WHERE ?', {id: id}, function(err, rows, fields){
        if(err) throw err;
        done(rows);
        conn.end();
    })
}


function getPrices(ids, done){
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query('SELECT price FROM products WHERE id in (?)', [ids], function(err, rows, fields){
        if(err) throw err;
        done(rows);
        conn.end();
    })
}

module.exports = {
    getAllProducts,
    addNewProduct,
    removeProduct,
    getPrices,
}