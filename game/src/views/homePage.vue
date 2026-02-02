<template>
  <div class="home">
    <ul class="left">
      <li v-for="(item,index) in data.menu" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
const data = reactive({
  menu: [{ name: '新游戏' }, { name: '游戏存档' }, { name: '游戏设置' }, { name: '成就系统' }, { name: '退出游戏' }]
})

</script>
<style lang="scss" scoped>
.home {
  width:100%;
  height:100%;
  position:relative;
  .left{
    position:absolute;
    left:60px;
    bottom:60px;
    li{
      margin-bottom: 20px;
      font-size:20px;
      cursor:pointer;
    }
  }
}
</style>