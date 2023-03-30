

<template>
  <HeadNav v-if="$route.path != '/index'" />
  <RouterView />
  <Footer v-if="$route.path != '/admin'" />
  <returnTop />

  <div id="follow"></div>
</template>
<script setup lang="ts">
import HeadNav from "./components/headNav.vue"; //头部导航
import Footer from "./components/footer.vue"; //底部
import returnTop from "./components/returnTop.vue"; //返回顶部
import { onMounted } from 'vue';

onMounted(() => {
  var pic = document.getElementById('follow');

  document.addEventListener('mousemove', function (e) {
    var x = e.pageX;
    var y = e.pageY;
    pic!.style.left = x + 10 + 'px';
    pic!.style.top = y + 20 + 'px';
  })
})
// 冒泡排序

</script>
<style>
@import "./assets/css/base.css";

#follow {
  width: 10px;
  height: 10px;
  background-color: red;
  position: absolute;
  top: 2px;
}
</style>
