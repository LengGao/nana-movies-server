var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer()

var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(upload); // for parsing multipart/form-data


// var indexRouter = require('./routes/index');
var UserRouter = require('./routes/UserRouter');
var AdvertisementRouter = require('./routes/AdvertisementRouter');
var PhotoWorksRouter = require('./routes/PhotoWorksRouter')
var MovieWorksRouter = require('./routes/MovieWorksRouter')
var LoginRouter = require('./routes/LoginRouter')
// app.use('/', indexRouter);
app.use('/', UserRouter);
app.use('/', AdvertisementRouter);
app.use('/', PhotoWorksRouter);
app.use('/', MovieWorksRouter);
app.use('/', LoginRouter);

console.log("http://localhost:80/")
module.exports = app;