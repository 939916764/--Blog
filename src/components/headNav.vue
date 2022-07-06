<script setup lang="ts">
</script>
<template>
  <header>
    <div class="mainbox">
      <div class="logo">再度重相逢</div>
      <div class="nav">
        <ul>
          <li>个人主页</li>
          <li>项目记录</li>
          <li>问题记录</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
  position: sticky;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
  z-index: 222;
  height: 55px;
  .mainbox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ul{
        display: flex;
        li{
            padding: 0 20px;
            margin-right: 20px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
  }
}
</style>