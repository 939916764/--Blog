<template>
  <div class="layout-wrapper">
    <LayoutHeader />
    <div class="layout-body">
      <LayoutSidebar />
      <main class="layout-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import LayoutHeader from './HeaderComponent.vue'
import LayoutSidebar from './SidebarComponent.vue'
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a1a;
  overflow: hidden;
}

.layout-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.layout-main {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  color: #e0e0e0;
}
</style>
