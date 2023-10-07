<template>
  <footer>
    <div class="box">
      <div class="footer-top">
        <span><i><img src="../assets/img/address.png" alt="" /></i>北京东城区</span>
        <span><i><img src="../assets/img/qq.png" alt="" /></i>939916764</span>
        <span><i><img src="../assets/img/email.png" alt="" /></i>939916764@qq.com</span>
      </div>
      <p class="copyright">Copyright © 2021-2022 再度重相逢的个人博客</p>
    </div>
  </footer>
</template>

<style   lang="less" scoped>
footer {
  background-color: #000;
  padding: 80px 0 40px;



  .box {
    width: 1050px;
    margin: 0 auto;
  }

  .footer-top {
    display: flex;
    border-bottom: 1px solid rgba(216, 216, 216, 0.2);
    padding-bottom: 20px;
    margin-bottom: 20px;

    span {
      display: flex;
      align-items: center;
      color: #fff;
      margin-right: 40px;

      i {
        display: block;
        width: 16px;
        margin-right: 10px;
      }
    }
  }

  .copyright {
    font-size: 12px;
    color: #fff
  }
}
</style>