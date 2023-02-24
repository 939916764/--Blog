var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');//跨域
const secretKEY = 'asdfghjkqwertyuiopcvbnm';
var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var usersRouter = require('./routes/user');
var app = express();

const { expressjwt: jwt } = require("express-jwt");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//凡是以api开头的接口都不需要解密 path里面写的是正则表达式
app.use(jwt({ secret: secretKEY, algorithms: ["HS256"] }).unless({ path: ["/blog/list", '/user/login', '/public/images', "/blog/detail"] })) //使用express-jwt这个中间件 排除路径为api/login
// 接口路由
app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
