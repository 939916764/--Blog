var express = require('express');
var router = express.Router();
const { exec } = require('../src/db/mysql')

/* 获取博客列表 */
router.get('/list', function (req, res, next) {
  let num = req.query.pageSize * (req.query.page - 1)
  let sql = '';
  let type = req.query.type;
  let title = req.query.title


  if (req.query.title) {
    if (req.query.type == '') {
      sql = `select * from blogList where title LIKE '%${req.query.title}%'  ORDER BY id DESC  limit  ${req.query.pageSize} offset  ${num} `
    } else {
      sql = `select * from blogList where type = '${req.query.type}' and title LIKE '%${req.query.title}%'  ORDER BY id DESC  limit  ${req.query.pageSize} offset  ${num} `
    }

  } else if (req.query.type == '') {
    sql = `select * from blogList ORDER BY id DESC  limit  ${req.query.pageSize} offset  ${num} `
  } else if (req.query.type == undefined) {
    sql = `select * from blogList ORDER BY id DESC  limit  ${req.query.pageSize} offset  ${num} `
  } else {
    sql = `select * from blogList where type = '${req.query.type}'  ORDER BY id DESC  limit  ${req.query.pageSize} offset  ${num} `
  }

  exec(sql)
    .then(data => {
      console.log(3333)
      res.send({
        code: 200,
        data: data,
        message: '获取博客列表'
      });
    })
});

/* 获取博客详情 */
router.get('/detail', function (req, res, next) {
  const id = req.query.id;

  const sql = `select * from blogList WHERE id = '${id}'`;
  exec(sql).then(result => {
    res.send({ code: 200, data: result[0], message: '获取成功' });
  })
});

module.exports = router;
