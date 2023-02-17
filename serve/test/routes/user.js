var express = require('express');
var router = express.Router();

/* 登录*/
router.post('/login', function (req, res, next) {
  res.send('登录');
});

module.exports = router;
