<template>
  <div class="page-dashboard">
    <h1 class="page-title">首页</h1>
    <p class="page-desc">欢迎回来，勇者！</p>
    <div class="card" :class="{ 'max-reached': isMaxLevel }">
      <h1>
        ⚡ 经验圣殿
        <span>Lv.∞</span>
      </h1>

      <!-- 等级区域 -->
      <div class="level-badge">
        <div class="current-level">{{ level }} / {{ MAX_LEVEL }}</div>
        <div class="max-level" v-if="isMaxLevel">🏆 满级达成</div>
        <div class="max-level" v-else>⏳ 下一级 +{{ formatNumber(expRequired) }}</div>
      </div>

      <!-- 经验条卡片 -->
      <div class="exp-panel">
        <div class="exp-numbers">
          <span class="current-exp">{{ formatNumber(currentExp) }}</span>
          <span class="next-exp">/ {{ formatNumber(expRequired) }} EXP</span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="percent-tip">
          {{ progressPercent.toFixed(2) }}% · 每秒 +1 经验
        </div>
      </div>

      <!-- 额外数据 -->
      <div class="info-grid">
        <div class="info-cell">
          <div class="info-label">📊 升级倍率</div>
          <div class="info-value">×{{ GROWTH_FACTOR }} 指数</div>
        </div>
        <div class="info-cell">
          <div class="info-label">🎯 基础经验</div>
          <div class="info-value">{{ formatNumber(BASE_EXP) }}</div>
        </div>
        <div class="info-cell">
          <div class="info-label">⏱️ 状态</div>
          <div class="info-value">{{ isRunning ? '▶ 增长中' : '⏸ 暂停' }}</div>
        </div>
      </div>

      <!-- 操作按钮组 -->
      <div class="button-group">
        <button class="btn" @click="toggleTimer">
          {{ isRunning ? '⏸️ 暂停' : '▶️ 开始' }}
        </button>
        <button class="btn btn-primary" @click="addManualExp">
          ➕ +1 经验
        </button>
        <button class="btn btn-warning" @click="resetProgress">
          🔄 重置
        </button>
      </div>

      <div class="footer-note">
        🌟 第1级需 {{ formatNumber(BASE_EXP) }} 经验 · 每级指数上升 · 最高135级
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted,computed } from 'vue'
const MAX_LEVEL = 135;                // 总等级上限
const BASE_EXP = 10000;               // 第1级 → 第2级 所需经验
const GROWTH_FACTOR = 1.085;          // 指数增长系数 (约8.5%每级，后期明显但不过分夸张)

// ---------- 响应式状态 ----------
const level = ref(1);                  // 当前等级 (1~135)
const currentExp = ref(0);             // 当前等级已累积经验
const isRunning = ref(true);           // 计时器是否运行
let timerInterval = null;              // setInterval 句柄

// ---------- 核心计算：获取升到下一级所需经验 (基于当前等级) ----------
// 公式: 升到 (level+1) 所需经验 = BASE_EXP * (GROWTH_FACTOR ^ (level - 1))
const getExpRequired = (lvl) => {
  if (lvl >= MAX_LEVEL) return 0;      // 满级后无需求
  // 指数: 第一级 (lvl=1) 指数为0 → 10000 * (1.085^0) = 10000
  return BASE_EXP * Math.pow(GROWTH_FACTOR, lvl - 1);
};

// 计算属性：当前升级所需经验
const expRequired = computed(() => {
  return getExpRequired(level.value);
});

// 进度百分比 (0-100)
const progressPercent = computed(() => {
  if (level.value >= MAX_LEVEL) return 100;
  const required = expRequired.value;
  if (required <= 0) return 100;
  const percent = (currentExp.value / required) * 100;
  return Math.min(percent, 100);
});

// 是否已满级
const isMaxLevel = computed(() => level.value >= MAX_LEVEL);

// ---------- 辅助：数字格式化 (大数字加逗号) ----------
const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return Math.floor(num).toLocaleString();
};

// ---------- 核心：增加经验 (支持批量，但每秒只加1) ----------
const addExperience = (amount) => {
  // 满级后不再增加经验 (直接返回，同时也不影响界面)
  if (level.value >= MAX_LEVEL) {
    // 如果处于满级且计时器还在跑，可以选择自动暂停，更优雅
    if (isRunning.value) {
      stopTimer();
      isRunning.value = false;
    }
    return;
  }

  // 增加经验
  currentExp.value += amount;

  // 循环升级 (处理可能一次加大量经验的情况，虽然每秒+1不会触发多次，但手动按钮可能)
  while (level.value < MAX_LEVEL) {
    const needed = getExpRequired(level.value);
    if (currentExp.value >= needed) {
      currentExp.value -= needed;
      level.value++;
    } else {
      break;
    }
  }

  // 再次检查是否达到满级，如果满级则自动暂停计时器 (更符合直觉)
  if (level.value >= MAX_LEVEL) {
    if (isRunning.value) {
      stopTimer();
      isRunning.value = false;
    }
    // 满级时经验值可以保留溢出部分，但进度条100%，我们也可以把currentExp限制在0 (视觉效果更好)
    // 这里将溢出经验归零，让进度条干净显示100%
    currentExp.value = 0;
  }
};

// ---------- 计时器控制 ----------
const startTimer = () => {
  if (timerInterval) return; // 已存在则不再重复创建
  timerInterval = setInterval(() => {
    // 每秒增加1经验
    addExperience(1);
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

// 切换 运行/暂停
const toggleTimer = () => {
  // 如果已经满级，再按“开始”也不会增加经验，但为了交互友好，允许切换，但addExperience里会拦截
  if (level.value >= MAX_LEVEL) {
    // 如果满级了，点击开始无实际效果，但可以让用户继续点暂停/开始，但不影响经验
    // 我们简单切换状态，但计时器不会产生经验增加（因为addExperience满级直接return）
    // 这里保持计时器存在也没关系，但浪费资源；推荐如果满级，就不启动计时器
    if (!isRunning.value) {
      // 尝试启动，但立刻判断满级，在addExperience里不会增加。但计时器空转不太好，我们做特殊处理：
      // 满级时禁止启动计时器
      isRunning.value = false;
      stopTimer();
      return;
    } else {
      // 暂停
      isRunning.value = false;
      stopTimer();
      return;
    }
  }

  // 正常切换
  isRunning.value = !isRunning.value;
  if (isRunning.value) {
    startTimer();
  } else {
    stopTimer();
  }
};

// 手动增加1点经验（用于测试/快速点击）
const addManualExp = () => {
  addExperience(1);
  // 如果手动增加后等级变动，但计时器状态保持不变 (如果之前暂停，依然暂停)
  // 如果因为满级导致自动暂停，已经处理
};

// 重置进度
const resetProgress = () => {
  // 重置等级和经验
  level.value = 1;
  currentExp.value = 0;

  // 重置时，希望自动开始运行（除非用户手动暂停过，但重置代表重新开始，默认开启增长）
  // 如果之前是暂停状态，重置后让它运行更符合直觉
  const wasRunning = isRunning.value;

  // 先停止旧计时器
  stopTimer();

  // 设定为运行状态（重置后总是开始计时，给人一种“新开始”的感觉）
  isRunning.value = true;

  // 但如果之前满级导致暂停，重置后肯定要运行
  // 重新启动计时器
  startTimer();
};

// 同步isRunning与计时器 (例如外部可能调用)
// 监听isRunning变化？不需要，手动控制即可。

// ---------- 生命周期 ----------
onMounted(() => {
  // 初始默认运行
  if (isRunning.value) {
    startTimer();
  }
});

onUnmounted(() => {
  stopTimer();
});
</script>
<style lang="scss" scoped>
.page-dashboard {
  .page-title {
    font-size: 28px;
    color: #e94560;
    margin-bottom: 12px;
  }
  .page-desc {
    color: #a0a0b0;
    font-size: 16px;
  }
}

.card {
  background: rgba(18, 26, 40, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(74, 144, 226, 0.25);
  border-radius: 40px;
  box-shadow: 0 25px 40px -10px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(0, 255, 255, 0.1) inset;
  padding: 32px 28px;
  max-width: 560px;
  width: 100%;
  transition: all 0.2s;
  color: #eef4ff;
}

h1 {
  font-weight: 500;
  font-size: 1.9rem;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

h1 span {
  background: #2a3a5c;
  padding: 4px 14px;
  border-radius: 60px;
  font-size: 1rem;
  font-weight: 500;
  color: #b7d9ff;
  border: 1px solid #3e5a7c;
}

.level-badge {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 8px;
  margin-bottom: 12px;
}

.current-level {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #ffffff 0%, #c7e0ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 5px rgba(0, 160, 255, 0.3);
}

.max-level {
  color: #8da4d0;
  font-weight: 500;
  font-size: 1.2rem;
  background: #1e2b41;
  padding: 6px 14px;
  border-radius: 40px;
  border: 1px solid #3c5270;
}

.exp-panel {
  background: #0f1824;
  border-radius: 28px;
  padding: 20px 18px;
  margin: 18px 0 22px;
  border: 1px solid #2e4568;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.5), 0 6px 10px rgba(0, 0, 0, 0.3);
}

.exp-numbers {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: 12px;
}

.current-exp {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f0f9ff;
}

.next-exp {
  color: #9bb7dd;
  font-size: 1.1rem;
  align-self: flex-end;
  padding-bottom: 4px;
}

.progress-wrapper {
  background: #1c293f;
  height: 28px;
  border-radius: 40px;
  padding: 3px;
  box-shadow: inset 0 2px 5px #00000055, 0 2px 4px #00000030;
  border: 1px solid #2f4b70;
}

.progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #3ecf8e, #2aa3f0, #7b61ff);
  background-size: 200% 100%;
  border-radius: 40px;
  box-shadow: 0 0 12px #3e9cffaa, inset 0 1px 2px #ffffff88;
  transition: width 0.35s cubic-bezier(0.2, 0.9, 0.4, 1);
  border: 1px solid #9ad0ff80;
}

.percent-tip {
  text-align: right;
  margin-top: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #b0ceff;
  letter-spacing: 0.3px;
}

.info-grid {
  display: flex;
  gap: 16px;
  margin: 24px 0 20px;
}

.info-cell {
  background: #14202e;
  flex: 1;
  border-radius: 22px;
  padding: 14px 8px;
  text-align: center;
  border: 1px solid #315177;
  box-shadow: inset 0 1px 4px #00000033;
}

.info-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #99b8e3;
  margin-bottom: 6px;
}

.info-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #e2edff;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.btn {
  background: #1f3147;
  border: none;
  border-bottom: 3px solid #0e1a28;
  color: #e2ecfe;
  font-weight: 600;
  font-size: 1rem;
  padding: 14px 22px;
  border-radius: 60px;
  flex: 1 0 120px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: all 0.15s;
  box-shadow: 0 6px 0 #0c1622, 0 4px 8px #00000040;
  border: 1px solid #3f6290;
  letter-spacing: 0.3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn:hover {
  background: #2b405e;
  border-color: #5f8bc9;
  transform: translateY(-2px);
  box-shadow: 0 8px 0 #0c1622, 0 6px 12px #00000060;
}

.btn:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #0c1622, 0 3px 8px #00000060;
}

.btn-primary {
  background: #2f5a9c;
  border-bottom-color: #12315a;
  border-color: #6da5ff;
  color: white;
  text-shadow: 0 1px 2px black;
}

.btn-primary:hover {
  background: #3f74c0;
}

.btn-warning {
  background: #4f3b7c;
  border-bottom-color: #2c1d4e;
  border-color: #a78bfa;
}

.max-reached .progress-bar {
  background: linear-gradient(90deg, #f5b042, #ffd966);
  box-shadow: 0 0 18px #ffb347;
}

.footer-note {
  margin-top: 20px;
  text-align: center;
  color: #738eb0;
  font-size: 0.8rem;
  border-top: 1px dashed #2e4765;
  padding-top: 16px;
}
</style>
