require("dotenv").config();//Load environment variables
const connectDB=require("./db/db")
connectDB();
const cors = require('cors');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user.routes');
var usersRouter = require('./routes/users');
var cropsRouter = require('./routes/crops')
var farmsRouter = require('./routes/farms')
var expensesRouter = require('./routes/expenses')
var weatherRouter=  require('./routes/weather.routes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const allowedOrigins = [
 process.env.FRONTEND_API
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use('/', userRouter);
app.use('/users', usersRouter);
app.use('/crops',cropsRouter);
app.use('/farms',farmsRouter);
app.use('/expenses',expensesRouter);
app.use('/weather',weatherRouter)

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
