const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const dbConfig = require('./config/mongodb');

dbConfig().catch(console.dir);

app.use(logger('dev'));

app.use(cors());

function notfound (req, res, next){

    res.end("Not found!")
}

function goodbye (req, res, next){

    res.end("Good Bye!")
}

const temp = {
    name: 'John Smith',
    email: 'john@smith.ca'
}

app.get('/user/getuser', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201)
    res.json(temp);
})

app.get('/email/:address', (req, res) => {
    console.log(req.params.address);
//   res.send('Email: ' + req.params.email);
    res.redirect('/hello')
})

app.use(logger);
app.use('/hello', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello World!');
});
app.use('/bye', goodbye)
app.use(notfound);

app.listen(3000);