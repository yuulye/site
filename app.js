console.log(
`${'\n'.repeat(64)}>>> App restarted ${(new Date()).toTimeString()}`
);

//-----------------------------------------------------------

var config = require('./core/config');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var simpleMMORouter = require('./routes/simple_mmo');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// custom

app.use(expressLayouts);
app.use((req, res, next) => {
  res.locals.title = config.main.title;
  next();
});

app.use('/', express.static(path.join(__dirname, 'public')));

// custom

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/simple-mmo', simpleMMORouter);

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
