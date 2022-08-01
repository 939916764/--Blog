

var express = require('express');
var router = express.Router();

//引入连接数据库模块
const conn = require('./conn')

//连接数据
conn.connect(() => {
  console.log("数据库连接成功")
})
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(
      ret
    );
  }
};


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;