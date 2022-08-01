<template>
  <footer>
    <div class="mainbox">
      <div class="footer-top">
        <dl>
          <dt>在读重相逢的个人微博</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>相关链接</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>联系我</dt>
          <dd>
            <span>
              <i><img src="../assets/img/address.png" alt="" /></i>
              地址：北京东城区</span
            >

            <span>
              <i><img src="../assets/img/qq.png" alt="" /></i>
              QQ：939916764</span
            >

            <span>
              <i><img src="../assets/img/email.png" alt="" /></i>
              邮箱：939916764@qq.com</span
            >
          </dd>
        </dl>
      </div>
    </div>
    <p class="copyright">Copyright © 2021-2022 再度重相逢的个人博客</p>
  </footer>
</template>

<style   lang="less" scoped>
footer {
  background: #232328;

  .footer-top {
    padding: 60px 0 90px;
    display: flex;

    dl {
      width: 33%;
      dt {
        color: #fff;
        font-size: 18px;
        margin-bottom: 20px;
      }
      dd {
        span {
          display: block;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          i {
            display: block;
            width: 16px;
            margin-right: 20px;
          }
        }
      }
    }
  }
  .copyright {
    text-align: center;
    padding: 12px 0;
  }
}
</style>