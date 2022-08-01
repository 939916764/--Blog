<script setup lang="ts">
import HeadNav from "./components/headNav.vue"; //头部导航
import Footer from "./components/footer.vue"; //底部
</script>

<template>
  <HeadNav v-if="this.$route.path != '/index'" />
  <RouterView />
  <Footer />
</template>

<style>
@import "./assets/css/base.css";
</style>
