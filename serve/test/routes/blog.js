var express = require('express');
var router = express.Router();
const { exec } = require('../src/db/mysql')

/* 获取博客列表 */
router.get('/list', function (req, res, next) {
  let num = req.query.pageSize * (req.query.page - 1)
  exec(`select * from blogList  where  type = ${req.query.type}  limit  ${req.query.pageSize} offset  ${num}`)
    .then(data => {
      res.send({
        code: 200,
        data: data,
        msg: '获取博客列表'
      });
    })
});

/* 获取博客详情 */
router.get('/detail', function (req, res, next) {
  res.send('获取博客详情');
});

/* 新增一篇博客 */
router.post('/newCreate', function (req, res, next) {
  res.send('新增一篇博客');
});

/* 编辑博客 */
router.post('/edit', function (req, res, next) {
  res.send('编辑博客');
});

/* 删除博客 */
router.post('/del', function (req, res, next) {
  res.send('删除博客');
});

module.exports = router;
