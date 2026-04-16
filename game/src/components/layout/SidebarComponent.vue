<template>
  <aside class="layout-sidebar">
    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        active-class="active"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
const navItems = [
  { name: 'dashboard', path: '/dashboard', icon: '🏠', label: '首页' },
  { name: 'new-game', path: '/new-game', icon: '⚔', label: '新游戏' },
  { name: 'save-load', path: '/save-load', icon: '💾', label: '游戏存档' },
  { name: 'character', path: '/character', icon: '👤', label: '角色信息' },
  { name: 'map', path: '/map', icon: '🗺', label: '游戏地图' },
  { name: 'achievements', path: '/achievements', icon: '🏆', label: '成就系统' },
  { name: 'settings', path: '/settings', icon: '⚙', label: '游戏设置' },
]
</script>

<style lang="scss" scoped>
.layout-sidebar {
  width: 200px;
  min-width: 200px;
  height: 100%;
  background: linear-gradient(180deg, #16213e, #0f3460);
  border-right: 1px solid #1a3a6e;
  display: flex;
  flex-direction: column;

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    gap: 4px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    color: #a0a0b0;
    text-decoration: none;
    font-size: 14px;
    border-left: 3px solid transparent;
    transition: all 0.2s;

    &:hover {
      background: rgba(233, 69, 96, 0.1);
      color: #e0e0e0;
      border-left-color: rgba(233, 69, 96, 0.5);
    }

    &.active {
      background: rgba(233, 69, 96, 0.15);
      color: #e94560;
      border-left-color: #e94560;

      .nav-icon {
        filter: none;
      }
    }

    .nav-icon {
      font-size: 18px;
      width: 22px;
      text-align: center;
    }

    .nav-label {
      font-weight: 500;
      letter-spacing: 1px;
    }
  }
}
</style>
