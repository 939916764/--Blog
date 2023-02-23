<script setup lang="ts">
import { ref, onMounted } from "vue";

const router = ref([
  { path: "/", title: "index" },
  { path: "/project", title: "project" },
  { path: "/question", title: "question" },
]);
</script>
<template>
  <header>
    <div class="mainbox">
      <div class="logo"> <router-link to="/index">
          再度重相逢 </router-link></div>
      <div class="nav">
        <router-link :to="{ path: item.path }" v-for="(item, index) in router" :key="index">
          {{ item.title }}</router-link>
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

    .nav {
      display: flex;
      height: 100%;

      a {
        height: 100%;
        line-height: 55px;
        margin-right: 40px;

        &:last-child {
          margin-right: 0;
        }

        &.router-link-active {
          border-bottom: 3px solid #000b23;
        }
      }
    }
  }
}
</style>