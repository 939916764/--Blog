<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import HeadNav from "./components/headNav.vue"; //头部导航
</script>

<template>
  <HeadNav v-if="this.$route.path != '/index'" />
  <RouterView />
</template>

<style>
@import "./assets/css/base.css";
</style>
