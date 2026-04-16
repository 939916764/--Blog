<template>
  <header class="layout-header">
    <div class="header-logo">
      <span class="logo-icon">⚔</span>
      <span class="logo-text">游戏中心</span>
    </div>
    <div class="header-actions">
      <span class="user-info">玩家</span>
    </div>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.layout-header {
  height: 60px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-bottom: 1px solid #0f3460;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  color: #e0e0e0;

  .header-logo {
    display: flex;
    align-items: center;
    gap: 10px;

    .logo-icon {
      font-size: 22px;
    }

    .logo-text {
      font-size: 18px;
      font-weight: bold;
      color: #e94560;
      letter-spacing: 2px;
    }
  }

  .header-actions {
    .user-info {
      font-size: 14px;
      color: #a0a0b0;
    }
  }
}
</style>
