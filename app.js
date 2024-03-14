var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var dotenv = require('dotenv')
var mongoose = require('mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo');
var passport = require('passport')
var localStrategy = require('passport-local').Strategy
const User = require('./models/user')



dotenv.config();
var indexRouter = require('./routes/index');
var messageboardRouter = require('./routes/messageboard');

const mongoDB = process.env.DB_CONNECTION_STRING;

async function main(){
  await mongoose.connect(mongoDB)
}

main().catch(err => console.log(`Failed to connect to database: ${err}`))

const mongoSessionStore =  MongoStore.create({
  client:mongoose.connection.getClient()
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  store:mongoSessionStore,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24,
  }
}))

require('./passport/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/messageboard', messageboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
