var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors');
const connectDB = require('./models/db');

connectDB();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var historyRouter = require('./routes/history')
var testRouter = require('./routes/test');
var itemsRouter = require('./routes/items');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(cors());
const port = 3000; // for testing.
// const port = 8080;
app.use(cors(
  {
    // origin: [`http://localhost`, `https://localhost`],
    origin: [`http://localhost:${port}`, `https://localhost:${port}`],
    credentials: true,
  }
));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/history',historyRouter);
app.use('/items',itemsRouter);

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
