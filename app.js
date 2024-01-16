var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')
const postsRouter = require('./routes/post')
const discoverRouter = require('./routes/discover')
const { currentUserMiddleware, postsMiddleware, usersMiddleware } = require('./middleware/dbMiddleware')


require('dotenv').config()
const mongoose = require('mongoose')

var app = express();

// connect to mongodb
const dbURI = process.env.DB_URI
mongoose.connect(dbURI)
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: process.env.cookieKey, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(currentUserMiddleware)
app.use(postsMiddleware)
app.use(usersMiddleware)
app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/post', postsRouter)
app.use('/users', usersRouter);
app.use(discoverRouter);


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
