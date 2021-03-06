// const { Pool, Client } = require('pg');
// const client = new Client({
//           user: 'postgres',
//           host: 'group3-1-i.comp.nus.edu.sg',
//           database: 'credentials',
//           password: 'mysecretpassword',
//           port: 5435
// })
// client.connect()
// client.query('select * from login_credentials', (err, res) => {
//           console.log(err, res)
//           client.end()
// })

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');
var quotesRouter = require('./routes/quotes');
var authRouter = require('./routes/auth');
var recordsRouter = require('./routes/records');

var app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use('/', indexRouter);
// app.use('/quotes', quotesRouter);
app.use('/auth', authRouter);
app.use('/records', recordsRouter);

module.exports = app;