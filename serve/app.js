var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var http = require("http").Server(app);
const cors = require('cors');//跨域
// const secretKEY = 'asdfghjkqwertyuiopcvbnm';
// var indexRouter = require('./routes/index');
// var blogRouter = require('./routes/blog');
// var usersRouter = require('./routes/user');
var app = express();
var io = require("socket.io")(http, {
  allowEIO3: true,
  cors: {
    origin: "http://127.0.0.1:8080/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.emit("welcome", "welcome connect socket Serve.");

  socket.on("send", (data) => {
    console.log("客户端发送消息：", data);
  });

})

// const { expressjwt: jwt } = require("express-jwt");
// 监听 / 路径的 get 请求
app.get('/', function (req, res) {
  res.send('hello node')
})
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(cors());
// app.use(logger('dev'));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: false, limit: "50mb" }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// //凡是以api开头的接口都不需要解密 path里面写的是正则表达式
// app.use(jwt({ secret: secretKEY, algorithms: ["HS256"] }).unless({ path: ["/api/blog/list", '/api/user/login', '/public/images', "/api/blog/detail"] })) //使用express-jwt这个中间件 排除路径为api/login
// // 接口路由
// app.use('/', indexRouter);
// app.use('/api/blog', blogRouter);
// app.use('/api/user', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

http.listen(3000, function () {
  console.log("listening on *:3000");
});

io.on("connection", function (socket) {
  console.log("a user connected");
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
