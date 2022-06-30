<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import headNav from "./components/headNav.vue"; //头部导航
</script>

<template>

  <headNav></headNav>
   <router-view>
    <!-- HelloWorld -->
  </router-view>
</template>

<style>
@import "./assets/css/base.css";
</style>
