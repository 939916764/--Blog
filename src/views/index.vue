<script setup lang="ts">
</script>
<template>
  <div id="index">
    <div class="section">
      <div class="aside">
        <h3>再度重相逢-Blog</h3>
        <p>白日依山尽,黄河入海流。 欲穷千里目，更上一层楼。</p>
        <router-link :to="{ path: 'home' }"> Enter Blog</router-link>
      </div>

      <img src="../assets/img/down.png" alt="再度重相逢" class="down" />
    </div>
  </div>
</template>

<style lang="less" scoped>
#index {
  .section {
    width: 100vw;
    height: 100vh;
    background-color: #151515;
    background-image: url("../assets/img/section.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    .aside {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);

      h3 {
        color: #fff;
        font-size: 28px;
        margin-bottom: 20px;
      }
      p {
        color: #fff;
        font-size: 16px;
        letter-spacing: 10px;
        margin-bottom: 40px;
      }
      a {
        display: block;
        padding: 0 18px;
        border-radius: 4px;
        background-color: #1e9fff;
        height: 38px;
        line-height: 38px;
        color: #fff;
      }
    }
    .down {
      display: block;
      width: 48px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      margin: auto;
    }
  }
}
</style>