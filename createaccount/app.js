var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var bodyParser = require('body-parser');
var mongoose=require('mongoose');

var Users= require('./models/users');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var winston =require('winston');

//Db connection
var tt=mongoose.connect('mongodb://Keerthi:keerthi@ds133166.mlab.com:33166/teacher',function(err,success){

  if(err)
  console.log("error")
  else {
    console.log("connected")
  }
});
var db= mongoose.connection;
//var db2= mongoose.connection;
console.log("working...")




//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
