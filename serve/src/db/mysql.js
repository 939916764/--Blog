const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

// 统一执行sql函数
// 这个函数类似于一个单例模式，不需要.end关闭
function exec(sql) {
  // 因为要返回result，所以需要用异步promise来实现
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}


// 暴露出去
module.exports = {
  exec
}
