const env = process.env.NODE_ENV //环境参数
console.log(env)
// 配置
let MYSQL_CONF

// 开发环境下的
if (env === 'development') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    port: '33066',
    database: 'blog'
  }
}

// 线上的（现在只不过是没有具体区别线上线下）
if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    port: '33066',
    database: 'blog'
  }
}

module.exports = {
  MYSQL_CONF
}
