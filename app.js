require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const cookieCheck = require('./middlewares/cookieCheck');
const localsCheck = require('./middlewares/localsCheck');
const methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var recordRouter = require('./routes/records');
var eventRouter = require('./routes/events');
var userRouter = require('./routes/users');
var activityRouter = require('./routes/activities');
var apiRouter = require('./routes/apis')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'urbanEventsSecret',
  resave: false,
  saveUninitialized: true
}));

app.use(cookieCheck);
app.use(localsCheck);
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/events',eventRouter);
app.use('/records',recordRouter);
app.use('/users',userRouter);
app.use('/activities',activityRouter);
app.use('/apis',apiRouter);

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
