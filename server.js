/**
 * Created by pawan on 14/2/17.
 */

const express = require('express');
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/products/all', function (req, res) {
    db.getAllProducts(function (result) {
        res.send(result);
    })
});

app.post('/products/add', function (req, res) {
    db.addNewProduct(req.body.name, req.body.price, function (result) {
        res.redirect("/products")
    })
});

app.post('/products/remove', function (req, res) {
    db.removeProduct(req.body.id, function (result) {
        if (result.affectedRows == 0) {
            res.send("Can't remove");
        }
        else {
            res.send("successfully removed");
        }
    })
});

app.post('/products/getPrices', function (req, res) {
    if (req.body.ids.length == 0) {
        res.send([]);
    }
    else {
        db.getPrices(req.body.ids, function (result) {
            res.send(result);
        })
    }
});

app.use('/', express.static(path.join(__dirname, "public_html")));

app.listen(1234, function () {
    console.log("Server started at http://localhost:1234");
});