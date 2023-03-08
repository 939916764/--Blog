const express = require('express');
const router = express.Router();
const { exec } = require('../src/db/mysql')
//导入生成token的包
const jwt = require('../src/until/token')


//引入上传模块
let multer = require('multer');
//配置上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');//第二个参数表示文件存放位置
  },
  filename: (req, file, cb) => {
    //获取选中的文件名
    let originalName = file.originalname;
    //存到服务器上的名字(加上当前时间毫秒数防止同名文件覆盖)
    let newName = (new Date().getTime()) + '-' + originalName;
    cb(null, newName);
  }
})

const upload = multer({ storage: storage });

/* 登录*/
router.post('/login', function (req, res, next) {

  // 获取用户名和密码
  const account = req.body.account;
  const password = req.body.password;

  // 查询数据库
  const sql = 'SELECT * FROM user WHERE account=? AND password=?';
  exec(`SELECT * FROM user WHERE account = '${account}'  `).then(result => {
    if (result.length == 0) {
      res.send({ code: 500, message: '该用户不存在' });
    } else {
      if (password != result[0].passwords) {
        res.send({ code: 500, message: '密码错误' });
      } else {
        // 生成token//三个参数:  加密对象  解密字符串 有效时长
        var token = jwt.encrypt({
          gadID: result.account
        }, '1h');
        res.send({ code: 200, message: '登录成功', tokenStr: token });
      }
      // 如果没有登录成功，则返回登录失败
    }
  });

});

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear()
  }
  return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
}


/* 新增一篇博客 */
router.post('/newCreate', function (req, res, next) {
  const title = req.body.title;
  const img = req.body.img;
  const content = req.body.content;
  const author = req.body.author;
  const createTime = formatDate(new Date(), 'yy/mm/dd');
  const type = req.body.type;
  const sql = `INSERT INTO bloglist (title, img, content, author, createTime, type) VALUES ('${title}','${img}','${content}','${author}','${createTime}','${type}')`;

  const ifToken = jwt.decrypt(req.headers.authorization)
  exec(sql).then(result => {
    if (!ifToken) {
      res.send({ code: 403, message: '登录过期，请重新登录' });
    } else {
      res.send({ code: 200, message: '创建成功' });
    }
  })

});

/* 编辑博客 */
router.post('/edit', function (req, res, next) {
  const title = req.body.title;
  const img = req.body.img;
  const content = req.body.content;
  const type = req.body.type;
  const id = req.body.id;
  const sql = `UPDATE bloglist  SET title='${title}', img='${img}', content='${content}',  type='${type}'  WHERE id='${id}'`;

  const ifToken = jwt.decrypt(req.headers.authorization)
  exec(sql).then(result => {
    if (!ifToken) {
      res.send({ code: 403, message: '登录过期，请重新登录' });
    } else {
      res.send({ code: 200, message: '更新成功' });
    }
  })
});

/* 删除博客 */
router.post('/del', function (req, res, next) {
  const id = req.body.id;
  const sql = `DELETE FROM bloglist  WHERE id='${id}'`;

  const ifToken = jwt.decrypt(req.headers.authorization)
  exec(sql).then(result => {
    if (!ifToken) {
      res.send({ code: 403, message: '登录过期，请重新登录' });
    } else {
      res.send({ code: 200, message: '删除成功' });
    }

  })
});


router.post('/upload', upload.single('file'), function (req, res, next) {

  res.send({
    code: 200, message: '上传成功', img: 'http://39.105.148.140:3030/' + req.file.destination.replace('./public', '') + '/' + req.file.filename
  });
});

module.exports = router;
